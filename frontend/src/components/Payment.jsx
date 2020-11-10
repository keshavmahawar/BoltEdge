import React from 'react';
import axios from '../requests/request';
// import { openSnackbar } from '../redux/app/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        padding: '20px'
    },
    button: {
        width: '100%',
        background: '#c80764',
        margin: '10px'
    }
}));

const Payment = (props) => {
    const dispatch = useDispatch();
    const authToken = useSelector((state) => state.user.authToken);
    const classes = useStyles();
    const paymentHandler = async (e) => {
        e.preventDefault();

        const API_URL = 'user/payment/';
        const orderUrl = `${API_URL}order`;
        const response = await axios({
            method: 'GET',
            url: orderUrl,
            headers: {
                authorization: `Bearer ${authToken}`
            }
        });
        const { data } = response;
        const options = {
            name: 'Masai RazorPay',
            description: 'Integration of Razorpay',
            order_id: data.id,
            handler: async (response) => {
                try {
                    const paymentId = response.razorpay_payment_id;
                    const url = `${API_URL}capture/${paymentId}`;
                    const captureResponse = await axios({
                        method: 'POST',
                        url: url,
                        headers: {
                            authorization: `Bearer ${authToken}`
                        }
                    });
                    const successObj = JSON.parse(captureResponse.data);
                    const captured = successObj.captured;
                    if (captured) {
                        console.log("successfull")
                        // dispatch(
                        //     openSnackbar({
                        //         message: 'Payment successful!',
                        //         severity: 'success'
                        //     })
                        // );
                    }
                } catch (err) {
                    console.log(err)
                    // dispatch(
                    //     openSnackbar({
                    //         message: err,
                    //         severity: 'error'
                    //     })
                    // );
                }
            },
            theme: {
                color: '#c6203d'
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <Button onClick={paymentHandler} className={classes.button} variant="contained">
            Place Order
        </Button>
    );
};

export default Payment;
