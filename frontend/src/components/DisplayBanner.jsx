import React from "react";
import styled from "styled-components";
import { makeStyles, InputBase, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  InputBase: {
    border: "1px solid white",
    borderRadius: theme.spacing.borderRadius,
    padding: "15px 70px",
    background: "white",
    marginLeft: "30px",
    fontSize: "larger",
  },
  InputDiv: {
    marginTop: "25px",
    marginLeft: "25%",
  },
  Button: {
    padding: "15px 50px",
    marginLeft: "25px",
  },
}));

const BannerConatiner = styled.div`
  width: 100%;
  background-color: #0499f2;
  background-image: linear-gradient(315deg, #0499f2 0%, #26f596 74%);
  padding-top: 50px;
`;
const Heading = styled.h2`
  font-size: 40px;
  text-align: center;
  font-weight: 300;
  line-height: 50px;
  color: white;
`;

const BannerImage = styled.div`
  margin-top: 50px;
  margin-left: 25%;
`;

function DisplayBanner() {
  const classes = useStyles();
  return (
    <BannerConatiner>
      <Heading>
        The Best SEO & PPC Tools. Period.
        <br /> Starting at Only $33/mo.
      </Heading>
      <div className={classes.InputDiv}>
        <InputBase
          placeholder="Location"
          variant="outlined"
          className={classes.InputBase}
        />
        <InputBase
          placeholder="Restaruant Name"
          variant="outlined"
          className={classes.InputBase}
        />
        <Button variant="contained" color="primary" className={classes.Button}>
          Search
        </Button>
      </div>
      <BannerImage>
        <img src="https://cdn1.spyfu.com/dist/img/mbp-zoom.svg" alt="banner" />
      </BannerImage>
    </BannerConatiner>
  );
}

export default DisplayBanner;
