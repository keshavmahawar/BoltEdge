import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    Button,
    Grid,
    TextField,
    Box,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { userLogin } from "../redux/User/action";
import Navbar from "../components/Navbar";
import NonPrivateRoute from "../route/NonPrivateRoute";

const useStyles = makeStyles({
    mainLogin: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 500,
        minWidth: 300,
    },
    loginHeading: {
        textAlign: "left",
        fontSize: "50px",
        fontWeight: "300",
        color: "#333333",
        marginBottom: "20px",
    },
    loginPageImage: {
        width: "90%",
        height: "100%",
        objectFit: "cover",
        margin: "auto",
    },
});
function LoginPage(props) {
    const classes = useStyles(props);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(userLogin({ email, password }));
    };

    return (
        <div>
            <NonPrivateRoute />
            <Grid container style={{ minHeight: "100vh" }}>
                <Navbar />
                <Grid
                    container
                    item
                    xs={12}
                    sm={6}
                    alignItems="center"
                    direction="column"
                    justify="space-between"
                    style={{ padding: 10 }}
                >
                    <div />
                    <div className={classes.mainLogin}>
                        <Box className={classes.loginHeading}>
                            Login to your account
                        </Box>
                        <TextField
                            label="Email or Username"
                            margin="normal"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            value="Remember me"
                            control={<Checkbox color="primary" />}
                            label="Remember me"
                            labelPlacement="end"
                        />
                        <div style={{ height: 20 }} />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleLogin}
                        >
                            Log in
                        </Button>
                    </div>
                    <div />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img
                        src="undraw_data_xmfy (1).svg"
                        className={classes.loginPageImage}
                        alt="brand"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default LoginPage;
