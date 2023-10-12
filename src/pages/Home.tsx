import { Grid, Tab } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";
import SensorObject from "../SensorObject";

export interface SensorData {
  temperature: number;
  humidity: number;
  light: number;
  co: number;
  no2: number;
  nh3: number;
}

function Home() {
  const [time, setTime] = useState(Date.now().toString());

  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
    light: 0,
    co: 0,
    no2: 0,
    nh3: 0,
  });
  const [objectData, setObjectData] = useState([]);

  function fetchData() {
    // TODO:
    axios.get(`${_BACKEND_ADDRESS_}/aq`).then((resp) => {
      setSensorData(resp.data[0]);
      console.log(resp.data[0]);
    });

    axios.get(`${_BACKEND_ADDRESS_}/imp`).then((resp) => {
      setObjectData(resp.data);
    });
  }

  if (!_TESTING_) {
    useEffect(() => {
      const interval = setInterval(() => {
        fetchData();
        setTime(Date.now().toString())
      }, 300);
      
      return () => {
        clearInterval(interval);
      };
    }, []);
  }

  return (
    <Grid container direction="row" width="100%" alignItems="center">
      <Grid item xs={6}>
        <img
          src={`${_BACKEND_ADDRESS_}/image.jpg?${time}`}
          width={600}
          height={400}
        />
        {objectData.map((impValue: any) => {
          switch (impValue.type) {
            case "marker":
              return (
                <p>
                  Marker {impValue.markerValue} detected.
                  Drone position estimated to be: x={impValue.x}, y=
                  {impValue.y}, z={impValue.z}.
                </p>
              );
            case "valve":
              let valveState = "closed";
              if (impValue.open) {
                valveState = "open";
              }
              return (
                <p>
                  {impValue.time} - Valve detected. Valve is {valveState}
                </p>
              );
            case "gauge":
              return (
                <p>
                  {impValue.time} - Gauge detected. Gauge reading is{" "}
                  {impValue.gaugeReading}
                  {impValue.gaugeUnits}
                </p>
              );
            default:
              return <p>Error detected in log</p>;
          }
        })}
      </Grid>
      <Grid item md={6} xs={6}>
        <SensorObject>Temperature: {sensorData.temperature}</SensorObject>
        <SensorObject>Humidity: {sensorData.humidity}</SensorObject>
        <SensorObject>Humidity: {sensorData.humidity}</SensorObject>
        <SensorObject>Light: {sensorData.light}lux</SensorObject>
        <SensorObject>Carbon Monoxide: {sensorData.co}ppm</SensorObject>
        <SensorObject>Nitrous Oxide: {sensorData.no2}ppm</SensorObject>
        <SensorObject>Ammonia: {sensorData.nh3}ppm</SensorObject>
      </Grid>
    </Grid>
  );
}

export default Home;
