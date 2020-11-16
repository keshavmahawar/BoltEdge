import React from "react";
import Paper from "@material-ui/core/Paper";
import useStyles from "./ReportStyles";

export default function ComparisonCard(props) {
    const { heading, icon: Icon, data, fontSmall } = props;
    const classes = useStyles();
    return (
        <Paper
            className={classes.cardRadius}
            elevation={6}
            style={{ background: "#F4F4F8" }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <Icon className={classes.size} />
                <h3>{heading}</h3>
            </div>
            <div style={{ textAlign: "center" }}>
                {fontSmall ? (
                    <h3> {data || "Not Available"}</h3>
                ) : (
                    <h1> {data || "Not Available"}</h1>
                )}
            </div>
        </Paper>
    );
}
