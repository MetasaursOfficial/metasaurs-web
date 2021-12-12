import React from "react";
import okiBlue from "../../assets/icon/oki-blue.png";
import "./Footers.css";
import { Grid } from "@material-ui/core";

const MainFooter = () => {
  return (
    <div className="main-footer">
      <img src={okiBlue} alt="Oki Blue" className="footer-icon" />
      <Grid container>
        <Grid item lg={3}></Grid>
        <Grid item lg={4} xs={12} className="footer-font">
          © 2021 Big Head Entertainment, LLC / OKI’S WORLD
        </Grid>
        <Grid item lg={2} xs={6}>
          <a
            target="_blank"
            className="footer-link-text"
            href={`https://www.okis.world/terms-conditions`}
          >
            Terms & Conditions
          </a>
        </Grid>
        <Grid item lg={2} xs={6}>
          <a
            target="_blank"
            className="footer-link-text1"
            href={`https://www.okis.world/privacy`}
          >
            Privacy
          </a>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainFooter;
