import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";

import Plot from "react-plotly.js";
import { useState } from "react";

function Log() {
  const [value, setValue] = useState("1");

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function handleChange(event: React.SyntheticEvent, newValue: string) {
    setValue(newValue);
  }

  return (
    <>
      <TabContext value={value}>
        <TabList onChange={handleChange}>
          <Tab label="Item One" value="1" />
          <Tab label="Item Two" value="2" />
          <Tab label="Item Three" value="3" />
        </TabList>
        <TabPanel value="1">
          <Plot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
              { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
            ]}
            layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
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
            layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
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
            layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
          />
        </TabPanel>
      </TabContext>
    </>
  );
}

export default Log;
