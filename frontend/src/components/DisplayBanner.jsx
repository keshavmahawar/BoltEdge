import React from "react";
import styled from "styled-components";
import { makeStyles, InputBase, Grid, Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
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
  text-align: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.div`
  display: block;
  border: none;
  width: 9em;
  height: 2em;
  background: #008cba;
  color: white;
  line-height: 2;
  text-align: center;
  text-decoration: none;
  font-weight: 900;
  font-size: 22px;
  margin-top: 10px;
  margin-left: 20px;
`;

function DisplayBanner() {
  const classes = useStyles();
  return (
    <BannerConatiner>
      <Heading>
        The Best SEO & PPC Tools. Period.
        <br /> Starting at Only $33/mo.
      </Heading>

      <BannerImage>
        <Hidden only="sm">
          {" "}
          <img
            src="https://cdn1.spyfu.com/dist/img/mbp-zoom.svg"
            alt="banner"
          />
        </Hidden>
      </BannerImage>
    </BannerConatiner>
  );
}

export default DisplayBanner;
