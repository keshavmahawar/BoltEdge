import React from "react";
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
                                label="Email"
                                margin="normal"
                                variant="outlined"
                                disabled
                            />
                            <TextField
                                label="Phone no"
                                margin="normal"
                                variant="outlined"
                            />
                            <div style={{ height: 12 }} />
                            <Button color="primary" variant="contained">
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
                            />
                            <TextField
                                label=" New Password"
                                margin="normal"
                                variant="outlined"
                            />
                            <div style={{ height: 12 }} />
                            <Button color="primary" variant="contained">
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
