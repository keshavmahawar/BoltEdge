import axios from "../../requests/request";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
    SET_COMPETITOR_REQUEST,
    SET_COMPETITOR_SUCCESS,
    SET_COMPETITOR_FAILURE,
    SET_RESTAURANT_REQUEST,
    SET_RESTAURANT_SUCCESS,
    SET_RESTAURANT_FAILURE,
} from "./actionTypes";
import { toast } from "react-toastify";

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

const setRestaurantRequest = (payload) => {
    return {
        type: SET_RESTAURANT_REQUEST,
        payload,
    };
};

const setRestaurantSuccess = (payload) => {
    return {
        type: SET_RESTAURANT_SUCCESS,
        payload,
    };
};

const setRestaurantFailure = (payload) => {
    return {
        type: SET_RESTAURANT_FAILURE,
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
            toast.error(
                err?.response?.data?.message || "unknown error while login"
            );
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
        .post("/user/competitors", payload.topCompetitor, {
            headers: {
                Authorization: payload.authToken,
            },
        })
        .then((res) => {
            toast.success(res.data.message);
            dispatch(setCompetitorSuccess(res.data.competitor));
        })
        .catch((err) => {
            dispatch(setCompetitorFailure(err?.response?.data?.message));
            toast.error(
                err?.response?.data?.message ||
                    "Competitors could not be updated"
            );

            throw err;
        });
};

const setRestaurant = (payload) => (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        try {
            dispatch(setRestaurantRequest(payload));
            const authToken = getState().user.authToken;
            const { data } = await axios.post("/user/restaurant", payload, {
                headers: {
                    Authorization: authToken,
                },
            });
            dispatch(setRestaurantSuccess(data.restaurant));
            toast.success("Restaurant updated successfully");
            resolve();
        } catch (err) {
            dispatch(setRestaurantFailure(err?.response?.data?.message));
            toast.error(err?.response?.data?.message || "Could not be updated");
            reject();
        }
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
    setRestaurant,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
    SET_COMPETITOR_REQUEST,
    SET_COMPETITOR_SUCCESS,
    SET_COMPETITOR_FAILURE,
    SET_RESTAURANT_REQUEST,
    SET_RESTAURANT_SUCCESS,
    SET_RESTAURANT_FAILURE,
};
