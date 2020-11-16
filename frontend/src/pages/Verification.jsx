import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gst_fssai_Change } from "../redux/User/action";
import { Redirect } from "react-router-dom";
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
    subHeading: {
        textAlign: "left",
        fontSize: "25px",
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
    const { authToken, gstNo, fssaiNo, isVerified } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const [gst, setGst] = useState(gstNo);
    const [fssai, setFssai] = useState(fssaiNo);

    const handleGstFssai = () => {
        dispatch(gst_fssai_Change({ gst, fssai, authToken }));
    };
    if (isVerified) return <Redirect to="/dashboard/report" />;
    return (
        <div className={classes.root}>
            <div>
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
                                Business Verification
                            </Box>
                            <Box className={classes.subHeading}>
                                Update your business details below, this process
                                may take upto 24 hr to verify your details
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
