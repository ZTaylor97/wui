import { Grid, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Plot from "react-plotly.js";
import { useState } from "react";

function Home() {
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
      <Grid container justifyContent="space-around">
        <Grid item xs="auto">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F820063239134738515%2F86745AF87C937AA087B763BA7AF35A704A2BDC2F%2F&f=1&nofb=1&ipt=b83cce6349c212060f823c429274661d855e9c1f48d184ff96bf07ad697a1974&ipo=images"
            width={400}
            height={300}
          />
        </Grid>
        <Grid item xs="auto">
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
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
