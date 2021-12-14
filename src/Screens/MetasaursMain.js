import React, { useState } from "react";
import logo from "../assets/Groupmeta.png";
import mint from "../assets/mintgroup.png";
import punkgreen from "../assets/punkgreen.png";
import punkred from "../assets/punkred.png";
import coming from "../assets/coming.png";
import mobileredpunk from '../assets/mobile-red-punk.png';
import mobilegreenpunk from '../assets/mobile-green-punk.png';

import {
  Typography,
  Grid,
  Container,
  TextField,
  MenuItem,
  Box,
} from "@material-ui/core";
import "./Styles.css";

const preSale = "Pre-Sale Coming Soon";
const whitelist = "Whitelist Pre-Sale";
const day = "Thursday, Dec 16th @ 12:00AM EST";
const day1 = "(Until 2:00PmEST on Friday, December 17th)";
const publicSale = "Public Sale";
const publicTime = " Friday, December 17th @ 3:00PM EST";
const quantityArray = ["1", "2", "3", "4", "5", "6"];

const MetasaursMain = () => {
  const [quantity, setQuantity] = useState("");
  const handleChange = (value) => {
    setQuantity(value);
  };
  return (
    <Container maxWidth={false}>
      <img src={logo} className="image-margin" />
      <Typography variant="h2" className="sale-coming">
        {preSale}
      </Typography>
      <img src={mint} className="image-margin" />
      <Grid container spacing={3}>
        <Grid item lg={4} className="green-punk">
          <img src={punkgreen} width={"100%"} height={"500px"} />
        </Grid>
        <Grid item lg={4}>
          <Typography variant="h4" className="presale-coming">
            {whitelist}
          </Typography>

          <Typography variant="h5" className="white-coming">
            {day}
          </Typography>
          <Typography variant="p" className="white-coming">
            {day1}
          </Typography>

          <Typography variant="h4" className="presale-coming">
            {publicSale}
          </Typography>
          <Typography variant="h5" className="white-coming">
            {publicTime}
          </Typography>
          <TextField
            label="Quantity"
            variant="outlined"
            margin="normal"
            required
            select
            className="dropdown-quantity"
            onChange={(event) => handleChange(event.target.value)}
            value={quantity}
          >
            {quantityArray.map((x) => (
              <MenuItem>{x}</MenuItem>
            ))}
          </TextField>
          <img src={coming} />
        </Grid>

        <Grid item lg={4} className="red-punk">
          <img src={punkred} width={"100%"} height={"500px"} />
        </Grid>
      </Grid>
      <Box className="mobile-view">
        <img src={mobilegreenpunk} width={"50%"}/>
        <img src={mobileredpunk} width={"50%"}/>
      </Box>
    </Container>
  );
};

export default MetasaursMain;
