import { useState } from "react";

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
    <>
      <Grid container>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="NavTabs">
              <Tab label="Home" value="1" />
              <Tab label="Item Two" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Home />
          </TabPanel>
          <TabPanel value="2">
            <Log />
          </TabPanel>
        </TabContext>
      </Grid>
    </>
  );
}

export default App;
