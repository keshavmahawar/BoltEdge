import React from "react";
import axios from "../requests/request";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { toast } from "react-toastify";
import { refreshUser } from "../redux/User/action";

const useStyles = makeStyles(() => ({
    root: {
        width: "max-content",
        textAlign: "center",
        margin: "0px auto",
    },
    heading: {
        textAlign: "left",
        fontSize: "50px",
        fontWeight: "300",
        color: "#333333",
        marginBottom: "10px",
    },
}));

function Payment(props) {
    const dispatch = useDispatch();
    const authToken = useSelector((state) => state.user.authToken);
    const classes = useStyles();
    const [planType, setPlanType] = useState(1);
    const paymentSuccess = async (response) => {
        try {
            const captureResponse = await axios.post("user/paid", response, {
                headers: {
                    authorization: authToken,
                },
            });
            toast.success("Payment successful");
            dispatch(refreshUser());
        } catch (err) {
            console.log(err);
            toast.error(
                "Payment failed, if amount deducted then will be refunded"
            );
        }
    };

    const paymentHandler = async (e) => {
        e.preventDefault();

        const response = await axios.post(
            "user/order",
            { type: planType },
            {
                headers: {
                    authorization: authToken,
                },
            }
        );

        const { data } = response;

        const options = {
            name: "Bolt Edge Payment",
            description: "Bolt Edge Premium Plan",
            order_id: data.id,
            handler: paymentSuccess,
            theme: {
                color: "#c6203d",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div className={classes.root}>
            <Box className={classes.heading}>Buy Premium Plan</Box>
            <Box margin={4}>
                <Select
                    labelId="Plan Type"
                    value={planType}
                    onChange={(event) => setPlanType(event.target.value)}
                >
                    <MenuItem value={1}>Monthly Plan(Rs. 200)</MenuItem>
                    <MenuItem value={2}>Yearly Plan(Rs. 2000)</MenuItem>
                </Select>
            </Box>

            <Button
                onClick={paymentHandler}
                variant="contained"
                color="secondary"
                size="large"
            >
                Place Order
            </Button>
        </div>
    );
}

export default Payment;
