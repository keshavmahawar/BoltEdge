import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
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

const MyTextField = ({ label, type, placeholder, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <TextField
            {...field}
            type={type}
            helperText={errorText}
            label={label}
            placeholder={placeholder}
            margin="normal"
            variant="outlined"
            error={!!errorText}
        />
    );
};

const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup
        .string()
        .min(6, "Password should have miniumum 6 characters!")
        .required("Required"),
});

function LoginPage(props) {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const handleLogin = async (data) => {
        dispatch(userLogin(data));
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
                    {/* <div /> */}

                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (data, { setSubmitting }) => {
                            setSubmitting(true);
                            await handleLogin(data);
                            console.log("submit: ", data);
                            setSubmitting(false);
                        }}
                    >
                        {({ values, errors, isSubmitting }) => (
                            <Form className={classes.mainLogin}>
                                <Box className={classes.loginHeading}>
                                    Login to your account
                                </Box>
                                <MyTextField
                                    label="Email or Username"
                                    name="email"
                                    required={true}
                                />
                                <MyTextField
                                    label="Password"
                                    name="password"
                                    required={true}
                                    type="password"
                                />
                                <div style={{ height: 20 }} />
                                <Button
                                    disabled={isSubmitting}
                                    color="primary"
                                    variant="contained"
                                >
                                    Log in
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    {/* <div /> */}
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
