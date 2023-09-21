import { Grid, Tab } from "@mui/material";

import { useState, useEffect } from "react";

function Home() {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Grid container direction="row" width="100%" alignItems="center">
      <Grid item xs={6}>
        <img
          src={`http://10.88.23.146:3000/image.jpg?${time}`}
          width={600}
          height={400}
        />
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
}

export default Home;
