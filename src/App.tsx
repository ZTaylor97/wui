import { useState } from "react";

import "./index.css";

import qut from "./assets/qut.jpg";

import Home from "./pages/Home.tsx";
import Log from "./pages/Log.tsx";
import { Box, Tab, Grid } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React from "react";

function App() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="NavTabs">
              <Tab label="Home" value="1" />
              <Tab label="Logging" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Home />
          </TabPanel>
          <TabPanel value="2">
            <Log />
          </TabPanel>
        </TabContext>
        <footer><img src={qut} width={16} height={16}></img>{" QUTPayloadTAQ Group 2: 2023"}</footer>
      </Grid>
    </Grid>
  );
}
export default App;
