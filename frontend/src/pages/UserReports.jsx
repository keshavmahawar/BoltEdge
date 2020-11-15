import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ListIcon from "@material-ui/icons/List";
import StarsIcon from "@material-ui/icons/Stars";
import RateReviewIcon from "@material-ui/icons/RateReview";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ComparisonCard from "../components/ComparisonCard";
import DataCard from "../components/DataCard";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "../requests/request";

const useStyles = makeStyles((theme) => ({
    nav: {
        marginLeft: 10,
        padding: 5,
    },
    root1: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(2),
            width: theme.spacing(40),
            height: theme.spacing(18),
        },
    },
    root2: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(2),
            width: theme.spacing(84),
            height: theme.spacing(58),
        },
    },
    root3: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(2),
            width: theme.spacing(84),
            height: theme.spacing(58),
        },
    },
    root4: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(2),
            width: theme.spacing(38),
            height: theme.spacing(20),
        },
    },
    root5: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(0, 3, 1, 3),
            width: theme.spacing(14),
            height: theme.spacing(8),
        },
    },
    root6: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(2),
            width: theme.spacing(172),
            height: theme.spacing(90),
        },
    },
    root7: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(2),
            width: theme.spacing(70),
            height: theme.spacing(70),
        },
    },
    size: {
        margin: theme.spacing(2),
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));
export default function UserReports() {
    const classes = useStyles();
    const [competitorSelect, setCompetitorSelect] = useState(0);
    const [data, setData] = useState(null);
    const restaurant = useSelector((state) => state.user.restaurant);
    const competitor = useSelector((state) => state.user.competitor);
    const authToken = useSelector((state) => state.user.authToken);
    useEffect(() => {
        const request = async () => {
            setData(null);
            try {
                const { data: report } = await axios.get("/user/report", {
                    params: {
                        competitorNo: competitorSelect,
                    },
                    headers: {
                        Authorization: authToken,
                    },
                });
                console.log(report);

                setData(report);
            } catch (error) {
                console.log(error.response);
            }
        };
        request();
    }, [competitorSelect]);
    if (!restaurant) return <Redirect to="/dashboard/restaurant/add" />;
    else if (!competitor.length)
        return <Redirect to="/dashboard/restaurant/competitors" />;
    return (
        <div className={classes.root}>
            <div>
                Select Competitor:
                <Select
                    labelId="Plan Type"
                    value={competitorSelect}
                    onChange={(event) =>
                        setCompetitorSelect(event.target.value)
                    }
                >
                    {competitor.map(({ name }, index) => (
                        <MenuItem value={index} key={index}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </div>

            {data ? (
                <div className={classes.root1}>
                    <ComparisonCard
                        heading="No Of Items"
                        data={data.noOfItems}
                        icon={ListIcon}
                    />
                    <ComparisonCard
                        heading="Rating Comparison"
                        data={data.rating}
                        icon={StarsIcon}
                    />
                    <ComparisonCard
                        heading="Review Comparison"
                        data={data.votes}
                        icon={RateReviewIcon}
                    />
                    <ComparisonCard
                        heading="Discount comparison"
                        data={data.discount}
                        icon={LocalOfferIcon}
                    />
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className={classes.root2}>
                    <Paper elevation={5} style={{ background: "#FFFFFF" }}>
                        <div style={{ display: "flex" }}>
                            <TrendingUpIcon className={classes.size} />
                            <h3>Sales Trend Chart</h3>
                        </div>
                        <div>
                            <img
                                style={{ width: 670 }}
                                src="https://pbs.twimg.com/media/DlDgB8BU4AAXoGq.jpg"
                                alt="Charts"
                            />
                        </div>
                    </Paper>
                </div>
                <div className={classes.root3}>
                    <Paper elevation={5} style={{ background: "#FFFFFF" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <RestaurantIcon className={classes.size} />
                            <h3>Competitor Comparison</h3>
                        </div>
                        <div className={classes.root4}>
                            <DataCard
                                heading="Average Order Value"
                                icon={RestaurantMenuIcon}
                                data={data?.aov?.c}
                            />
                            <DataCard
                                heading="Discount Gap"
                                icon={RestaurantMenuIcon}
                                data={
                                    data?.discountGap === 0
                                        ? "Same Discounts"
                                        : data?.discountGap
                                }
                            />
                        </div>
                        <div className={classes.root4}>
                            <DataCard
                                heading="Average Burn"
                                icon={RestaurantMenuIcon}
                                data={data?.burn}
                            />
                            <DataCard
                                heading="Cuisines Type"
                                icon={RestaurantMenuIcon}
                                data={data?.cuisines?.c}
                                fontSmall={true}
                            />
                        </div>
                    </Paper>
                </div>
            </div>

            <div className={classes.root6}>
                <Paper elevation={5} style={{ background: "#FFFFFF" }}>
                    <div style={{ display: "flex", textAlign: "center" }}>
                        {/* <TrendingUpIcon className={classes.size}/> */}
                        <img
                            src="https://www.pngitem.com/pimgs/m/4-40385_logo-best-seller-png-transparent-png.png"
                            style={{
                                height: "60px",
                                width: "60px",
                                margin: "10px",
                            }}
                            alt="best seller"
                        />
                        <h3>Best Selling Comparison</h3>
                    </div>
                    <div className={classes.root7}>
                        <Paper elevation={5} style={{ background: "#F4F4F8" }}>
                            <div style={{ textAlign: "center" }}>
                                <strong>Yours</strong>
                                {data &&
                                    data.bestSellers &&
                                    data.bestSellers.b.map((item, index) => (
                                        <h3 key={item + index}>{item}</h3>
                                    ))}
                            </div>
                        </Paper>
                        <Paper elevation={5} style={{ background: "#F4F4F8" }}>
                            <div style={{ textAlign: "center" }}>
                                <strong>Competitor</strong>
                                {data &&
                                    data.bestSellers &&
                                    data.bestSellers.c.map((item, index) => (
                                        <h3 key={item + index}>{item}</h3>
                                    ))}
                            </div>
                        </Paper>
                    </div>
                </Paper>
            </div>
        </div>
    );
}
