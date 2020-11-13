import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import {
    Button,
    Grid,
    TextField,
    Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { adminUserLogin } from "../redux/Admin/action";

const useStyles = makeStyles({
    mainLogin: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        minWidth: 250,
        margin: '150px auto'
    },
    loginHeading: {
        textAlign: "center",
        fontSize: "45px",
        fontWeight: "300",
        color: "#333333",
        marginBottom: "20px",
    }
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

function AdminLoginPage(props) {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const handleLogin = async (data) => {
        dispatch(adminUserLogin(data));
    };

    return (
        <div>
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
                            Login to Admin Page
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
                            type="submit"
                        >
                            Log in
                                </Button>
                    </Form>
                )}
            </Formik>
            <div />
        </div >
    );
}

export default AdminLoginPage;
