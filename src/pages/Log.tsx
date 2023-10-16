import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Tab,
  Grid,
  Button,
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
  Stack,
  Box,
  Container,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import CloseIcon from "@mui/icons-material/Close";

import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import axios from "axios";

  // Data state
  export interface aqData {
    col_id: number;
    time: string;
    temperature: number;
    humidity: number;
    pressure: number;
    light: number;
    co: number;
    nh3: number;
    no2: number;
  };

  //TODO: rename
  export interface impData {
    col_id: number;
    time: string;
    col_type: string;
    valve_open: boolean;
    gauge_reading: number;
    gauge_units: string;
    markerCode: number;
    coord_x: number;
    coord_y: number;
    coord_z: number;
  };

function Log() {
  // Time form state
  const [startTimeValue, setStartTimeValue] = useState<dayjs.Dayjs | null>(
    dayjs().subtract(10, "minute")
  );
  const [endTimeValue, setEndTimeValue] = useState<dayjs.Dayjs | null>(dayjs());

  // Formatting state
  const [tabValue, setTabValue] = useState("1");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("Error");

  const [aqData, setAqData] = useState<Array<aqData>>([]);
  const [impData, setImpData] = useState<Array<impData>>([]);

  // Load data on page load
  useEffect(() => {
      fetchData();
  }, []);

  function tabHandleChange(event: React.SyntheticEvent, newValue: string) {
    setTabValue(newValue);
  }

  function fetchData() {
    if (
      startTimeValue?.isAfter(dayjs().add(30, "second"))
    ) {
      setAlertText("Please enter a start time that isn't in the future");
      setAlertOpen(true);
      return;
    }

    if (startTimeValue?.isAfter(endTimeValue)) {
      setAlertText("Please enter a start time that is before the end time");
      setAlertOpen(true);
      return;
    }

    if (startTimeValue != null && endTimeValue != null) {
      let startString = startTimeValue.format("YYYY-MM-DD HH:mm:ss");
      let endString = endTimeValue.format("YYYY-MM-DD HH:mm:ss");

      if (_TESTING_){

      } else{
      axios
        .post(`${_BACKEND_ADDRESS_}:3000/aq`, {
          startTime: startString,
          endTime: endString,
        })
        .then((resp) => {
          setAqData(resp.data);
        });

      axios
        .post(`${_BACKEND_ADDRESS_}:3000/imp`, {
          startTime: startString,
          endTime: endString,
        })
        .then((resp) => {
          setImpData(resp.data);
        });
      }
    }
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopTimePicker
            label="Start Time"
            value={startTimeValue}
            onChange={(newValue) => setStartTimeValue(newValue)}
          />
          <DesktopTimePicker
            label="End Time"
            value={endTimeValue}
            onChange={(newValue) => setEndTimeValue(newValue)}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item alignItems="center">
        <Collapse in={alertOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              <strong>Error</strong>
            </AlertTitle>
            {alertText}
          </Alert>
        </Collapse>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={fetchData}>
          Submit
        </Button>
      </Grid>
      <Grid container item direction="row" xs={12} justifyContent="center">
        <Grid item xs={6} justifyContent="center">
          <Container fixed>
            <TabContext value={tabValue}>
              <TabList onChange={tabHandleChange}>
                <Tab label="Temperature" value="1" />
                <Tab label="Humidity" value="2" />
                <Tab label="Light" value="3" />
                <Tab label="Pressure" value="4" />
                <Tab label="Gas: CO" value="5" />
                <Tab label="Gas: NO2" value="6" />
                <Tab label="Gas: NH3" value="7" />
              </TabList>
              <TabPanel value="1">
                <Plot
                  data={[
                    {
                      x: aqData.map((x) =>
                        dayjs(x.time).format("HH:mm:ss").toString()
                      ),
                      y: aqData.map((x) => x.temperature),
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "red" },
                    },
                  ]}
                  layout={{
                    width: 600,
                    height: 400,
                    title: "Temperature (Celsius)",
                    yaxis: { title: "Temperature (C)" },
                  }}
                />
              </TabPanel>
              <TabPanel value="2">
                <Plot
                  data={[
                    {
                      x: aqData.map((x) =>
                        dayjs(x.time).format("HH:mm:ss").toString()
                      ),
                      y: aqData.map((x) => x.humidity),
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "blue" },
                    },
                  ]}
                  layout={{
                    width: 600,
                    height: 400,
                    title: "Humidity",
                    yaxis: { title: "Humidity (%)" },
                  }}
                />
              </TabPanel>
              <TabPanel value="3">
                <Plot
                  data={[
                    {
                      x: aqData.map((x) =>
                        dayjs(x.time).format("HH:mm:ss").toString()
                      ),
                      y: aqData.map((x) => x.light),
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "green" },
                    },
                  ]}
                  layout={{
                    width: 600,
                    height: 400,
                    title: "Light",
                    yaxis: { title: "Light (lux)" },
                  }}
                />
              </TabPanel>
              <TabPanel value="4">
                <Plot
                  data={[
                    {
                      x: aqData.map((x) =>
                        dayjs(x.time).format("HH:mm:ss").toString()
                      ),
                      y: aqData.map((x) => x.pressure),
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "green" },
                    },
                  ]}
                  layout={{
                    width: 600,
                    height: 400,
                    title: "Pressure",
                    yaxis: { title: "Pressure (hPa)" },
                  }}
                />
              </TabPanel>
              <TabPanel value="5">
                <Plot
                  data={[
                    {
                      x: aqData.map((x) =>
                        dayjs(x.time).format("HH:mm:ss").toString()
                      ),
                      y: aqData.map((x) => x.co),
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "green" },
                    },
                  ]}
                  layout={{
                    width: 600,
                    height: 400,
                    title: "Carbon Monoxide",
                    yaxis: { title: "CO (ppm)" },
                  }}
                />
              </TabPanel>
              <TabPanel value="6">
                <Plot
                  data={[
                    {
                      x: aqData.map((x) =>
                        dayjs(x.time).format("HH:mm:ss").toString()
                      ),
                      y: aqData.map((x) => x.no2),
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "green" },
                    },
                  ]}
                  layout={{
                    width: 600,
                    height: 400,
                    title: "Nitrous Oxide",
                    yaxis: { title: "NO2 (ppm)" },
                  }}
                />
              </TabPanel>
              <TabPanel value="7">
                <Plot
                  data={[
                    {
                      x: aqData.map((x) =>
                        dayjs(x.time).format("HH:mm:ss").toString()
                      ),
                      y: aqData.map((x) => x.nh3),
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "green" },
                    },
                  ]}
                  layout={{
                    width: 600,
                    height: 400,
                    title: "Ammonia",
                    yaxis: { title: "NH3 (ppm)" },
                  }}
                />
              </TabPanel>
            </TabContext>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Stack>
            {impData.map((impValue) => {
              switch (impValue.col_type) {
                case "marker":
                  return (
                    <p key={impValue.col_id}>
                      {impValue.time} - Marker {impValue.markerCode} detected.
                      Drone position estimated to be: x={impValue.coord_x}, y=
                      {impValue.coord_y}, z={impValue.coord_z}.
                    </p>
                  );
                case "valve":
                  let valveState = "closed";
                  if (impValue.valve_open) {
                    valveState = "open";
                  }
                  return (
                    <p key={impValue.col_id}>
                      {impValue.time} - Valve detected. Valve is {valveState}
                    </p>
                  );
                case "gauge":
                  return (
                    <p key={impValue.col_id}>
                      {impValue.time} - Gauge detected. Gauge reading is{" "}
                      {impValue.gauge_reading}
                      {impValue.gauge_units}
                    </p>
                  );
                default:
                  return <p key={impValue.col_id}>Error detected in log</p>;
              }
            })}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Log;
