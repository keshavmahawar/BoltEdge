import axios from "../../requests/request";
import {
    GET_COMPETITOR_REQUEST,
    GET_COMPETITOR_SUCCESS,
    GET_COMPETITOR_FAILURE,
    SET_COMPETITOR_REQUEST,
    SET_COMPETITOR_SUCCESS,
    SET_COMPETITOR_FAILURE,
} from "./actionTypes";

const getCompetitorRequest = (payload) => {
    return {
        type: GET_COMPETITOR_REQUEST,
        payload,
    };
};

const getCompetitorSuccess = (payload) => {
    return {
        type: GET_COMPETITOR_SUCCESS,
        payload,
    };
};

const getCompetitorFailure = (payload) => {
    return {
        type: GET_COMPETITOR_FAILURE,
        payload,
    };
};

const usergetCompetitor = (payload) => (dispatch) => {
    dispatch(getCompetitorRequest(payload));
    return axios
        .get("/user/competitors", {
            headers: {
                'Authorization': payload
            }
        })
        .then((res) => {
            dispatch(getCompetitorSuccess(res.data));
        })
        .catch((err) => {
            dispatch(getCompetitorFailure(err?.response?.data?.message));
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
        .post("/user/login", payload)
        .then((res) => {
            dispatch(setCompetitorSuccess(res.data));
        })
        .catch((err) => {
            dispatch(setCompetitorFailure(err?.response?.data?.message));
        });
};

export {
    usergetCompetitor,
    getCompetitorFailure,
    getCompetitorRequest,
    getCompetitorSuccess,
    usersetCompetitor,
    setCompetitorFailure,
    setCompetitorRequest,
    setCompetitorSuccess,
    GET_COMPETITOR_REQUEST,
    GET_COMPETITOR_SUCCESS,
    GET_COMPETITOR_FAILURE,
    SET_COMPETITOR_REQUEST,
    SET_COMPETITOR_SUCCESS,
    SET_COMPETITOR_FAILURE,
};
