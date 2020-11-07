import React from 'react'
import styled from 'styled-components'
import { Container, Divider, Grid, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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

const Button = styled.div`
    width: 300px;
    height: 50px;
    padding-top: 20px;
    background-color:#f4a72d;
    color: white;
    border:none;
    border-bottom: 1px solid gray;
    border-radius: 5px;
    font-size: 20px;
    text-shadow: 1px 2px 0 rgba(0,0,0,.1);
    cursor: pointer;
    text-align: center;
    margin: 0 auto;

`

const Gap = styled.div`
    margin: 70px 0;
`

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        minHeight: 150,
        margin: 30,
        cursor: 'pointer'
    }
})

export default function AboutFeatures() {
    const classes = useStyles()

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
            <Gap />
            <Container>
                <Card className={classes.root}>1</Card>
                <Card className={classes.root}>2</Card>
                <Card className={classes.root}>3</Card>
            </Container>
            <Gap />
            <Divider />
            <ReviewSection>
                <Container>
                    <Heading>Membership starts at just $33/month.<br />Unlimited data and downloads.</Heading>
                    <SubHeading>Every plan includes unlimited searches and downloads.<br />30-day, no questions-asked, money back guarantee. No contracts. Zero hoops.</SubHeading>
                    <Button>TRY BOLTEDGE NOW</Button>
                </Container>
            </ReviewSection>

        </>
    )
}

