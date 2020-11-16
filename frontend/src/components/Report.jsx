import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ListIcon from "@material-ui/icons/List";
import StarsIcon from "@material-ui/icons/Stars";
import RateReviewIcon from "@material-ui/icons/RateReview";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ComparisonCard from "./ComparisonCard";
import DataCard from "./DataCard";
import { Line } from "react-chartjs-2";
import useStyles from "./ReportStyles";
import clsx from "clsx";

const options = {
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    unit: "day",
                },
            },
        ],
    },
};

export default function Report(props) {
    const { data } = props;
    const classes = useStyles();
    return (
        <>
            <div className={classes.root1}>
                <ComparisonCard
                    heading="No Of Items"
                    data={data?.noOfItems}
                    icon={ListIcon}
                />
                <ComparisonCard
                    heading="Rating Comparison"
                    data={data?.rating}
                    icon={StarsIcon}
                />
                <ComparisonCard
                    heading="Review Comparison"
                    data={data?.votes}
                    icon={RateReviewIcon}
                />
                <ComparisonCard
                    heading="Discount comparison"
                    data={data?.discount}
                    icon={LocalOfferIcon}
                />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className={classes.root2}>
                    <Paper
                        className={classes.cardRadius}
                        elevation={5}
                        style={{ background: "#FFFFFF" }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <TrendingUpIcon className={classes.size} />
                            <h3>Order Trend Chart</h3>
                        </div>
                        <div>
                            {data?.salesTrend ? (
                                <Line
                                    data={{
                                        datasets: [
                                            {
                                                label: "order trends",
                                                data: data?.salesTrend?.map(
                                                    ({ sales, date }) => ({
                                                        x: date,
                                                        y: sales,
                                                    })
                                                ),
                                                fill: false,
                                                backgroundColor:
                                                    "rgb(255, 99, 132)",
                                                borderColor:
                                                    "rgba(255, 99, 132, 0.2)",
                                            },
                                        ],
                                    }}
                                    options={options}
                                />
                            ) : (
                                    <div
                                        style={{
                                            textAlign: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            margin: "30px",
                                        }}
                                    >
                                        <h2>
                                            Enough data not available for showing
                                            projections, wait for few days to gather
                                            more data
                                    </h2>
                                    </div>
                                )}
                        </div>
                    </Paper>
                </div>
                <div className={classes.root3}>
                    <Paper
                        className={classes.cardRadius}
                        elevation={5}
                        style={{ background: "#FFFFFF" }}
                    >
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
                    <div
                        style={{
                            display: "flex",
                            textAlign: "center",
                            alignItems: "center",
                        }}
                    >
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
                                <h1 style={{ margin: '15px' }}>Yours</h1>
                                {data &&
                                    data.bestSellers &&
                                    data.bestSellers.b.map((item, index) => (
                                        <h3 key={item + index} style={{ margin: '8px' }}>{item}</h3>
                                    ))}
                            </div>
                        </Paper>
                        <Paper elevation={5} style={{ background: "#F4F4F8" }}>
                            <div style={{ textAlign: "center" }}>
                                <h1 style={{ margin: '15px' }}>Competitor</h1>
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
        </>
    );
}
