import React from "react";
import styled from "styled-components";
import { Hidden } from "@material-ui/core";

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

function DisplayBanner() {
    return (
        <BannerConatiner>
            <Heading>We would like to watch your restaurant grow.</Heading>
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
