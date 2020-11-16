import React from "react";
import Paper from "@material-ui/core/Paper";
import useStyles from "./ReportStyles";

export default function ComparisonCard(props) {
    const { heading, icon: Icon, data } = props;
    const classes = useStyles();
    return (
        <Paper
            elevation={5}
            className={classes.cardRadius}
            style={{ background: "#FFFFFF" }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <Icon className={classes.size} />
                <h3>{heading}</h3>
            </div>
            {data ? (
                <div className={classes.root5}>
                    <Paper elevation={2} style={{ background: "#F4F4F8" }}>
                        <div style={{ textAlign: "center" }}>
                            <strong>Yours</strong>
                            <h1 style={{ marginTop: "-1px" }}>{data.b}</h1>
                        </div>
                    </Paper>
                    <Paper elevation={2} style={{ background: "#F4F4F8" }}>
                        <div style={{ textAlign: "center" }}>
                            <strong>Competitor</strong>
                            <h1 style={{ marginTop: "-1px" }}>{data.c}</h1>
                        </div>
                    </Paper>
                </div>
            ) : (
                <h1>
                    <div style={{ textAlign: "center" }}>Not Available</div>
                </h1>
            )}
        </Paper>
    );
}
