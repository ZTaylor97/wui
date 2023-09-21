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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CloseIcon from "@mui/icons-material/Close";

import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import axios from "axios";

const ip_address = "10.88.23.146";

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

  // Data state
  const [aqData, setAqData] = useState([]);
  const [impData, setImpData] = useState([]);

  // Load data on page load
  useEffect(() => {
    fetchData();
  }, []);

  function tabHandleChange(event: React.SyntheticEvent, newValue: string) {
    setTabValue(newValue);
  }

  function fetchData() {
    if (
      startTimeValue?.isAfter(dayjs().add(30, "second")) ||
      endTimeValue?.isAfter(dayjs().add(30, "second"))
    ) {
      setAlertText("Please enter times that aren't in the future");
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

      axios
        .post(`http://${ip_address}:3000/aq`, {
          startTime: startString,
          endTime: endString,
        })
        .then((resp) => {
          setAqData(resp.data);
          console.log(resp.data);
        });

      axios
        .post(`http://${ip_address}:3000/imp`, {
          startTime: startString,
          endTime: endString,
        })
        .then((resp) => {
          setImpData(resp.data);
          console.log(resp.data);
        });
    }
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={startTimeValue}
            onChange={(newValue) => setStartTimeValue(newValue)}
          />
          <TimePicker
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
      <Grid container direction="row" xs={12} justifyContent="center">
        <Grid item xs={6} justifyContent="center">
          <Container fixed>
            <TabContext value={tabValue}>
              <TabList onChange={tabHandleChange}>
                <Tab label="Temperature" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
              <TabPanel value="1">
                <Plot
                  data={[
                    {
                      x: aqData.map((x) => x.time),
                      y: aqData.map((x) => x.temperature),
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "red" },
                    },
                  ]}
                  layout={{ width: 600, height: 400, title: "Temperature" }}
                />
              </TabPanel>
              <TabPanel value="2">
                <Plot
                  data={[
                    {
                      x: [69, 420, 666],
                      y: [2, 6, 3],
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "blue" },
                    },
                  ]}
                  layout={{ width: 600, height: 400, title: "A Fancy Plot" }}
                />
              </TabPanel>
              <TabPanel value="3">
                <Plot
                  data={[
                    {
                      x: [69, 420, 666],
                      y: [2, 6, 3],
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "green" },
                    },
                  ]}
                  layout={{ width: 600, height: 400, title: "A Fancy Plot" }}
                />
              </TabPanel>
            </TabContext>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Stack>
            <h1>Entry one</h1>
            <h1>another one</h1>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Log;
