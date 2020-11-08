import axios from "../../requests/request";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
    SET_COMPETITOR_REQUEST,
    SET_COMPETITOR_SUCCESS,
    SET_COMPETITOR_FAILURE,
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

const userLogin = (payload) => (dispatch) => {
    dispatch(loginRequest(payload));
    return axios
        .post("/user/login", payload)
        .then((res) => {
            dispatch(loginSuccess(res.data));
        })
        .catch((err) => {
            dispatch(loginFailure(err?.response?.data?.message));
        });
};

const setCompetitorRequest = (payload) => {
    return {
        type: SET_COMPETITOR_REQUEST,
        payload,
    };
};

const setCompetitorSuccess = (payload) => {
    return {
        type: SET_COMPETITOR_SUCCESS,
        payload,
    };
};

const setCompetitorFailure = (payload) => {
    return {
        type: SET_COMPETITOR_FAILURE,
        payload,
    };
};

const usersetCompetitor = (payload) => (dispatch) => {
    dispatch(setCompetitorRequest(payload));
    return axios
        .post("/user/competitors", payload)
        .then((res) => {
            dispatch(setCompetitorSuccess(res.data));
        })
        .catch((err) => {
            dispatch(setCompetitorFailure(err?.response?.data?.message));
        });
};

export {
    userLogin,
    loginFailure,
    loginRequest,
    loginSuccess,
    loginLogout,
    usersetCompetitor,
    setCompetitorFailure,
    setCompetitorRequest,
    setCompetitorSuccess,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
    SET_COMPETITOR_REQUEST,
    SET_COMPETITOR_SUCCESS,
    SET_COMPETITOR_FAILURE,
};
