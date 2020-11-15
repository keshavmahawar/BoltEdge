import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 2,
        background: "#F4F4F8",
    },
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

export default function ComparisonCard(props) {
    const { heading, icon: Icon, data } = props;
    const classes = useStyles();
    return (
        <Paper elevation={5} style={{ background: "#FFFFFF" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Icon className={classes.size} />
                <h3>{heading}</h3>
            </div>
            {data ? (
                <div className={classes.root5}>
                    <Paper elevation={5} style={{ background: "#F4F4F8" }}>
                        <div style={{ textAlign: "center" }}>
                            <strong>Yours</strong>
                            <h1 style={{ marginTop: "-1px" }}>{data.b}</h1>
                        </div>
                    </Paper>
                    <Paper elevation={5} style={{ background: "#F4F4F8" }}>
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
