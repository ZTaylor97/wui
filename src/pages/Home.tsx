import { Grid, Tab } from "@mui/material";

function Home() {
  return (
    <Grid container direction="row" width="100%" alignItems="center">
      <Grid item xs={6}>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F820063239134738515%2F86745AF87C937AA087B763BA7AF35A704A2BDC2F%2F&f=1&nofb=1&ipt=b83cce6349c212060f823c429274661d855e9c1f48d184ff96bf07ad697a1974&ipo=images"
          width={800}
          height={600}
        />
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
}

export default Home;
