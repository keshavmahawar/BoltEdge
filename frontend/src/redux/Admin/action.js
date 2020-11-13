import axios from "../../requests/request";
import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_LOGOUT
} from "./actionTypes";
import { toast } from "react-toastify";

const adminLoginRequest = (payload) => {
    return {
        type: ADMIN_LOGIN_REQUEST,
        payload,
    };
};

const adminLoginSuccess = (payload) => {
    return {
        type: ADMIN_LOGIN_SUCCESS,
        payload,
    };
};

const adminLoginFailure = (payload) => {
    return {
        type: ADMIN_LOGIN_FAILURE,
        payload,
    };
};

const adminLoginLogout = () => {
    return {
        type: ADMIN_LOGIN_LOGOUT,
    };
};

const adminUserLogin = (payload) => (dispatch) => {
    dispatch(adminLoginRequest(payload));
    return axios
        .post("/admin/login", payload)
        .then((res) => {
            console.log(res)
            dispatch(adminLoginSuccess(res.data));
        })
        .catch((err) => {
            dispatch(adminLoginFailure(err?.response?.data?.message));
            toast.error(
                err?.response?.data?.message || "unknown error while login"
            );
        });
};

export {
    adminLoginRequest,
    adminLoginSuccess,
    adminLoginFailure,
    adminLoginLogout,
    adminUserLogin,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_LOGOUT
}