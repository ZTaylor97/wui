import { Grid, Tab } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";
import SensorObject from "../SensorObject";
import { aqData, impData } from "./Log";

const updateDelay = 200;

function Home() {
  const [time, setTime] = useState(Date.now().toString());

  const [sensorData, setSensorData] = useState<aqData>({
    col_id: 0,
    time: "",
    temperature: 0,
    humidity: 0,
    light: 0,
    pressure: 0,
    co: 0,
    no2: 0,
    nh3: 0,
  });
  const [objectData, setObjectData] = useState<Array<impData>>([]);

  function fetchData() {
    // TODO: make route for getting most recent sensor data in db
    if(_TESTING_){
      let mockSensorData: aqData = {
        col_id: 69,
        time: "2023-12-10 12:32:12",
        temperature: 25.0,
        humidity: 30.4,
        light: 200.4,
        pressure: 43.12,
        co: 30,
        no2: 40,
        nh3: 70,
      };

      setSensorData(mockSensorData);

      let mockObjectData: Array<impData> = [
        {
          col_id: 1,
          time: "2023-12-10 12:32:12",
          type: "valve",
          isOpen: true,
          gaugeReading: 0,
          gaugeUnits: "bar",
          markerCode: 0,
          x: 0,
          y: 0,
          z: 0,
        },
        {
          col_id: 2,
          time: "2023-12-10 12:32:12",
          type: "gauge",
          isOpen: false,
          gaugeReading: 30.0,
          gaugeUnits: "bar",
          markerCode: 0,
          x: 0,
          y: 0,
          z: 0,
        },
        {
          col_id: 3,
          time: "2023-12-10 12:32:12",
          type: "marker",
          isOpen: true,
          gaugeReading: 0,
          gaugeUnits: "bar",
          markerCode: 172534,
          x: 1,
          y: 2,
          z: 3,
        },
      ];
      setObjectData(mockObjectData);
    } else {
    axios.get(`${_BACKEND_ADDRESS_}/aqlive`).then((resp) => {
      if (resp.data.length > 0){
        setSensorData(resp.data[0]);
        console.log(resp.data[0]);
      }
      
    });
    // TODO: modify backend so that up to 3 most recent values in last second are shown
    axios.get(`${_BACKEND_ADDRESS_}/implive`).then((resp) => {
      setObjectData(resp.data);
    }); 
  }
  }

    useEffect(() => {
      const interval = setInterval(() => {
        fetchData();
        setTime(Date.now().toString())
      }, updateDelay);
      
      return () => {
        clearInterval(interval);
      };
    }, []);

  return (
    <Grid container direction="row" width="100%" alignItems="center">
      <Grid item xs={6}>
        <img
          src={`${_BACKEND_ADDRESS_}/image.jpg?${time}`}
          width={600}
          height={400}
        />
        {objectData.map((impValue: impData) => {
          switch (impValue.type) {
            case "marker":
              return (
                <p key={impValue.col_id}>
                  Marker {impValue.markerCode} detected.
                  Drone position estimated to be: x={impValue.x}, y=
                  {impValue.y}, z={impValue.z}.
                </p>
              );
            case "valve":
              let valveState = "closed";
              if (impValue.isOpen) {
                valveState = "open";
              }
              return (
                <p key={impValue.col_id}>Valve detected. Valve is {valveState}</p>
              );
            case "gauge":
              return (
                <p key={impValue.col_id}>
                  Gauge detected. Gauge reading is {impValue.gaugeReading}
                  {impValue.gaugeUnits}
                </p>
              );
            default:
              return <p key={Date.now()}>Error detected in log</p>;
          }
        })}
      </Grid>
      <Grid item xs={6}>
        <SensorObject>Temperature: {sensorData.temperature}C</SensorObject>
        <SensorObject>Humidity: {sensorData.humidity}%</SensorObject>
        <SensorObject>Pressure: {sensorData.pressure}bar</SensorObject>
        <SensorObject>Light: {sensorData.light}lux</SensorObject>
        <SensorObject>Carbon Monoxide: {sensorData.co}ppm</SensorObject>
        <SensorObject>Nitrous Oxide: {sensorData.no2}ppm</SensorObject>
        <SensorObject>Ammonia: {sensorData.nh3}ppm</SensorObject>
      </Grid>
    </Grid>
  );
}

export default Home;
