import { Button, Grid, Tab } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";
import SensorObject from "../SensorObject";
import { aqData, impData } from "./Log";

const updateDelay = 300;

function cycleLCD() {
  axios.get(`${_BACKEND_ADDRESS_}:5001/cyclegui`).then(() => {
  }).catch((error) => {
    console.log(error);
  });
}

function activateDrill() {
  axios.get(`${_BACKEND_ADDRESS_}:5001/tube`).then(() => {
  }).catch((error) => {
    console.log(error);
  })
}

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
          col_type: "valve",
          valve_open: true,
          gauge_reading: 0,
          gauge_units: "bar",
          markerCode: 0,
          coord_x: 0,
          coord_y: 0,
          coord_z: 0,
        },
        {
          col_id: 2,
          time: "2023-12-10 12:32:12",
          col_type: "gauge",
          valve_open: false,
          gauge_reading: 30.0,
          gauge_units: "bar",
          markerCode: 0,
          coord_x: 0,
          coord_y: 0,
          coord_z: 0,
        },
        {
          col_id: 3,
          time: "2023-12-10 12:32:12",
          col_type: "marker",
          valve_open: true,
          gauge_reading: 0,
          gauge_units: "bar",
          markerCode: 172534,
          coord_x: 1,
          coord_y: 2,
          coord_z: 3,
        },
      ];
      setObjectData(mockObjectData);
    } else {
    axios.get(`${_BACKEND_ADDRESS_}:3000/aqlive`).then((resp) => {
      if (resp.data.length > 0){
        setSensorData(resp.data[0]);
        console.log(resp.data[0]);
      }
      
    }).catch((error) => {
    console.log(error)
    });
    // TODO: modify backend so that up to 3 most recent values in last second are shown
    axios
      .get(`${_BACKEND_ADDRESS_}:3000/implive`)
      .then((resp) => {
        setObjectData(resp.data);
      })
      .catch((error) => {
        console.log(error);
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
          src={`${_BACKEND_ADDRESS_}:3000/image.jpg?${time}`}
          width={600}
          height={400}
        />
        {objectData.map((impValue: impData) => {
          switch (impValue.col_type) {
            case "marker":
              return (
                <p style={{ color: "black" }} key={impValue.col_id}>
                  Marker {impValue.markerCode} detected. Drone position
                  estimated to be: x={impValue.coord_x}, y=
                  {impValue.coord_y}, z={impValue.coord_z}.
                </p>
              );
            case "valve":
              let valveState = "closed";
              if (impValue.valve_open) {
                valveState = "open";
              }
              return (
                <p style={{ color: "black" }} key={impValue.col_id}>
                  Valve detected. Valve is {valveState}
                </p>
              );
            case "gauge":
              return (
                <p style={{ color: "black" }} key={impValue.col_id}>
                  Gauge detected. Gauge reading is {impValue.gauge_reading}
                  {impValue.gauge_units}
                </p>
              );
            default:
              return (
                <p style={{ color: "red" }} key={Date.now()}>
                  Error detected in object data
                </p>
              );
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
        <Button
          style={{ background: "green" }}
          variant="contained"
          onClick={cycleLCD}
        >
          Cycle LCD
        </Button>
        <Button
          style={{ background: "red" }}
          variant="contained"
          onClick={activateDrill}
        >
          Emergency sampling
        </Button>
      </Grid>
    </Grid>
  );
}

export default Home;
