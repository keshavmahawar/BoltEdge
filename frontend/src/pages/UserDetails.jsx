import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    passwordChange,
    numberChange,
    gst_fssai_Change,
} from "../redux/User/action";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Button, Grid, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    mainLogin: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 500,
        minWidth: 400,
    },
    loginHeading: {
        textAlign: "left",
        fontSize: "50px",
        fontWeight: "300",
        color: "#333333",
        marginBottom: "10px",
    },
    root: {
        flexGrow: 2,
    },
    nav: {
        marginLeft: 10,
        padding: 5,
    },
});
export default function UserDetails() {
    const classes = useStyles();
    const {
        email,
        authToken,
        phoneNo,
        gstNo,
        fssaiNo,
        restaurant,
    } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPhoneNum, setNewPhoneNum] = useState(phoneNo);
    const [gst, setGst] = useState(gstNo);
    const [fssai, setFssai] = useState(fssaiNo);

    const handlePasswordChange = () => {
        dispatch(passwordChange({ oldPassword, newPassword, authToken }));
    };

    const handleNewPhoneNum = () => {
        dispatch(numberChange({ newPhoneNum, authToken, email }));
    };

    const handleGstFssai = () => {
        dispatch(gst_fssai_Change({ gst, fssai, authToken }));
    };
    return (
        <div className={classes.root}>
            <div>
                <Grid container>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={6}
                        alignItems="center"
                        direction="column"
                        justify="space-between"
                        style={{ padding: 2 }}
                    >
                        <div />
                        <div className={classes.mainLogin}>
                            <Box className={classes.loginHeading}>
                                User Login
                            </Box>
                            <TextField
                                value={email}
                                label="Email"
                                margin="normal"
                                variant="outlined"
                                disabled
                            />
                            <TextField
                                label="Phone no"
                                margin="normal"
                                variant="outlined"
                                type="number"
                                value={newPhoneNum}
                                onChange={(e) => setNewPhoneNum(e.target.value)}
                            />
                            <div style={{ height: 12 }} />
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleNewPhoneNum}
                            >
                                Update No
                            </Button>
                        </div>
                        <div />
                    </Grid>
                </Grid>

                <Grid container style={{ minHeight: "60vh" }}>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={6}
                        alignItems="center"
                        direction="column"
                        justify="space-between"
                        style={{ padding: 5 }}
                    >
                        <div />
                        <div className={classes.mainLogin}>
                            <Box className={classes.loginHeading}>
                                Change Password
                            </Box>
                            <TextField
                                label=" Old Password"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <TextField
                                label=" New Password"
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <div style={{ height: 12 }} />
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handlePasswordChange}
                            >
                                Update
                            </Button>
                        </div>
                        <div />
                    </Grid>
                </Grid>

                <Grid container style={{ minHeight: "60vh" }}>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={6}
                        alignItems="center"
                        direction="column"
                        justify="space-between"
                        style={{ padding: 5 }}
                    >
                        <div />
                        <div className={classes.mainLogin}>
                            <Box className={classes.loginHeading}>
                                Restaurant
                            </Box>
                            {restaurant
                                ? restaurant.name
                                : "Not Picked any restaurant choose one"}
                            <Link to="/dashboard/restaurant/add">
                                <Button color="primary" variant="contained">
                                    Pick New Restaurant
                                </Button>
                            </Link>
                        </div>
                        <div />
                    </Grid>
                </Grid>

                <Grid container style={{ minHeight: "60vh" }}>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={6}
                        alignItems="center"
                        direction="column"
                        justify="space-between"
                        style={{ padding: 5 }}
                    >
                        <div />
                        <div className={classes.mainLogin}>
                            <Box className={classes.loginHeading}>
                                Business Details
                            </Box>
                            <TextField
                                label="GST Details"
                                margin="normal"
                                variant="outlined"
                                value={gst}
                                onChange={(e) => setGst(e.target.value)}
                            />
                            <TextField
                                label="Fssi Details"
                                margin="normal"
                                variant="outlined"
                                value={fssai}
                                onChange={(e) => setFssai(e.target.value)}
                            />
                            <div style={{ height: 12 }} />
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleGstFssai}
                            >
                                Update Details
                            </Button>
                        </div>
                        <div />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
