import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { passwordChange, numberChange } from '../redux/User/action'
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
    const { email, authToken } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPhoneNum, setNewPhoneNum] = useState("")

    const handlePasswordChange = () => {
        dispatch(passwordChange({ oldPassword, newPassword, authToken }))
    }

    const handleNewPhoneNum = () => {
        dispatch(numberChange({ newPhoneNum, authToken }))
    }
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
                                onChange={(e) => setNewPhoneNum(e.target.value)}
                            />
                            <div style={{ height: 12 }} />
                            <Button color="primary" variant="contained" onClick={handleNewPhoneNum}>
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
                            <Button color="primary" variant="contained" onClick={handlePasswordChange}>
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
                            restaurant Details
                            <Button color="primary" variant="contained">
                                Change restaurant
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
                                Business Details
                            </Box>
                            <TextField
                                label="GST Details"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Fssi Details"
                                margin="normal"
                                variant="outlined"
                            />
                            <div style={{ height: 12 }} />
                            <Button color="primary" variant="contained">
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
