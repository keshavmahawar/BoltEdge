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
    const { heading, icon: Icon, data, fontSmall } = props;
    const classes = useStyles();
    return (
        <Paper elevation={6} style={{ background: "#F4F4F8" }}>
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
