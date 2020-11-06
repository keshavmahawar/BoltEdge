import React from 'react'
import styled from 'styled-components'
import { Container, Divider, Grid } from '@material-ui/core'

const ReviewSection = styled.div`
    max-width: 1700px;
    height: 50%;
    border: 1px solid #dee2e6;
    background-color: #f2f2f2;
    padding: 100px 10% 70px 10%;
    display: flex;
`

const ReviewCard = styled.div`
    // flex:1;
    flex-wrap:nowrap;
    flex-basis: auto;
    width: 100%;
    height:200px;
    border-bottom: 2px solid #dee2e6;
    border-radius: 5px;
    background-color: white;
    margin: 10px;
    padding: 25px 25px;
`

const Heading = styled.h2`
    font-size: 45px;
    text-align: center;
    font-weight: 300;
    line-height: 50px;
`

const SubHeading = styled.h3`
    font-size: 25px;
    text-align: center;
    font-weight: 250;
    line-height: 3 0px;
    color: gray;
    margin-bottom: 30px;
`

const Text = styled.p`
    text-align: left;
    line-height: 40px;
    color: black;
    padding: 10%;
    font-size: 20px;
    font-weight: 250;

`
export default function AboutFeatures() {

    return (
        <>
            <ReviewSection>
                <ReviewCard></ReviewCard>
                <ReviewCard></ReviewCard>
                <ReviewCard></ReviewCard>
            </ReviewSection>
            <Heading>What Does BoltEdge Do?</Heading>
            <SubHeading>BoltEdge exposes the search marketing secret formula of your most successful competitors.</SubHeading>

            <Container>
                <Grid container style={{ minHeight: '20vh', maxHeight: '500vh' }}>
                    <Grid container item xs={12} sm={6} alignItems="center" direction="column" justify="space-between" style={{ padding: 10 }}>

                        <Text >Search for any domain and see every place they've shown up on Google: every keyword they've bought on Adwords, every organic rank, and every ad variation in the last 14 years.<br />
                        Learn how to connect with these domains, too. Find online and traditional leads methods -- social media, email, phone, and address -- you can't find anywhere else.</Text>

                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <img src="undraw_analytics_5pgy.svg" style={{ width: "90%", height: "100%", objectFit: "cover" }} alt="brand" />
                    </Grid>
                </Grid>
            </Container>
            <Divider />

            <Heading>Competitor Research</Heading>
            <SubHeading>BoltEdge exposes the search marketing secret formula of your most successful competitors.</SubHeading>


            <Divider />
            <ReviewSection></ReviewSection>

        </>
    )
}

