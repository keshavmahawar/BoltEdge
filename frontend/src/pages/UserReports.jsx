import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Report from "../components/Report";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
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

    const reportRef = React.createRef();
    if (!restaurant) return <Redirect to="/dashboard/restaurant/add" />;
    else if (!competitor.length)
        return <Redirect to="/dashboard/restaurant/competitors" />;
    return (
        <div className={classes.root}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
            >
                <div>
                    Competitor: &nbsp;
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
                {/* <div>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={convertPdf}
                    >
                        Save Report
                    </Button>
                </div> */}

                <div>
                    <Link to="/restaurant/competitors">
                        <Button color="primary" variant="contained">
                            Change Competitors
                        </Button>
                    </Link>
                </div>
            </Box>
            {data ? (
                data.dataAvailable ? (
                    <Report data={data} />
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <h1>Data crunching in it may take some time</h1>
                        <img
                            src="https://i.pinimg.com/originals/59/a7/99/59a7995fed72fa18cb623d195f00abbc.gif"
                            alt="loading"
                        />
                    </div>
                )
            ) : (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6d391369321565.5b7d0d570e829.gif"
                        alt="loading"
                    />
                </div>
            )}
        </div>
    );
}
