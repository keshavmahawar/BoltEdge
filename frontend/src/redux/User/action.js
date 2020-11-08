import axios from "../../requests/request";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
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
    setRestaurant,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
    SET_RESTAURANT_REQUEST,
    SET_RESTAURANT_SUCCESS,
    SET_RESTAURANT_FAILURE,
};
