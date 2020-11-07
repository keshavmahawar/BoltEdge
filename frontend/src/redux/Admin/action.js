import axios from "../../requests/request";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
} from "./actionTypes";

const loginRequest = (payload) => {
    return {
        type: LOGIN_REQUEST,
        payload,
    };
};

const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload,
    };
};

const loginFailure = (payload) => {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
};
const loginLogout = () => {
    return {
        type: LOGIN_LOGOUT,
    };
};

const loginAdmin = (payload) => (dispatch) => {
    dispatch(loginRequest(payload))
    return axios.post("/user/login", payload)
        .then((res) => {
            dispatch(loginSuccess(res.data))
        })
        .catch((err) => {
            dispatch(loginFailure(err?.response?.data?.message))
        })
};

export {
    loginAdmin,
    loginFailure,
    loginRequest,
    loginSuccess,
    loginLogout,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
};
