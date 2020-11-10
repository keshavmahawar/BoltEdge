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
    PASSWORD_CHANGE_REQUEST,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAILURE,
    NUMBER_CHANGE_REQUEST,
    NUMBER_CHANGE_SUCCESS,
    NUMBER_CHANGE_FAILURE,
    RESTAURANT_CHANGE_REQUEST,
    RESTAURANT_CHANGE_SUCCESS,
    RESTAURANT_CHANGE_FAILURE,
    GST_FSSAI_CHANGE_REQUEST,
    GST_FSSAI_CHANGE_SUCCESS,
    GST_FSSAI_CHANGE_FAILURE
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
            console.log(res)
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
        .post("/user/competitors",
            payload.topCompetitor,
            {
                headers: {
                    Authorization: payload.authToken,
                }
            })
        .then((res) => {
            dispatch(setCompetitorSuccess(res.data.competitor));
        })
        .catch((err) => {
            dispatch(setCompetitorFailure(err?.response?.data?.message));
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

const numChangeRequest = (payload) => {
    return {
        type: NUMBER_CHANGE_REQUEST,
        payload,
    };
};

const numChangeSuccess = (payload) => {
    return {
        type: NUMBER_CHANGE_SUCCESS,
        payload,
    };
};

const numChangeFailure = (payload) => {
    return {
        type: NUMBER_CHANGE_FAILURE,
        payload,
    };
};

const numberChange = (payload) => (dispatch) => {
    dispatch(numChangeRequest(payload));
    return axios
        .post("/user/updatePhoneNo",
            {
                "email": payload.email,
                "phoneNo": payload.newPhoneNum
            },
            {
                headers: {
                    Authorization: payload.authToken,
                }
            })
        .then((res) => {
            dispatch(numChangeSuccess(res.data));
        })
        .catch((err) => {
            dispatch(numChangeFailure(err?.response?.data?.message));
        });
};

const passwordChangeRequest = (payload) => {
    return {
        type: PASSWORD_CHANGE_REQUEST,
        payload,
    };
};

const passwordChangeSuccess = (payload) => {
    return {
        type: PASSWORD_CHANGE_SUCCESS,
        payload,
    };
};

const passwordChangeFailure = (payload) => {
    return {
        type: PASSWORD_CHANGE_FAILURE,
        payload,
    };
};

const passwordChange = (payload) => (dispatch) => {
    dispatch(passwordChangeRequest(payload));
    return axios
        .post("/user/updatePassword",
            {
                "email": payload.email,
                "oldPassword": payload.oldPassword,
                "newPassword": payload.newPassword
            },
            {
                headers: {
                    Authorization: payload.authToken,
                }
            })
        .then((res) => {
            dispatch(passwordChangeSuccess(res.data));
        })
        .catch((err) => {
            dispatch(passwordChangeFailure(err?.response?.data?.message));
        });
};

const restaurantChangeRequest = (payload) => {
    return {
        type: PASSWORD_CHANGE_REQUEST,
        payload,
    };
};

const restaurantChangeSuccess = (payload) => {
    return {
        type: PASSWORD_CHANGE_SUCCESS,
        payload,
    };
};

const restaurantChangeFailure = (payload) => {
    return {
        type: PASSWORD_CHANGE_FAILURE,
        payload,
    };
};

const restaurantChange = (payload) => (dispatch) => {
    dispatch(restaurantChangeRequest(payload));
    return axios
        .post("/user/updateRestaurant",
            {

            },
            {
                headers: {
                    Authorization: payload.authToken,
                }
            })
        .then((res) => {
            dispatch(restaurantChangeSuccess(res.data));
        })
        .catch((err) => {
            dispatch(restaurantChangeFailure(err?.response?.data?.message));
        });
};

const gst_fssai_ChangeRequest = (payload) => {
    return {
        type: GST_FSSAI_CHANGE_REQUEST,
        payload,
    };
};

const gst_fssai_ChangeSuccess = (payload) => {
    return {
        type: GST_FSSAI_CHANGE_SUCCESS,
        payload,
    };
};

const gst_fssai_ChangeFailure = (payload) => {
    return {
        type: GST_FSSAI_CHANGE_FAILURE,
        payload,
    };
};

const gst_fssai_Change = (payload) => (dispatch) => {
    dispatch(gst_fssai_ChangeRequest(payload));
    return axios
        .post("/user/updateBusinessDetails",
            {
                "email": payload.email,
                "gstNo": payload.gst,
                "fssaiNo": payload.fssai
            },
            {
                headers: {
                    Authorization: payload.authToken,
                }
            })
        .then((res) => {
            dispatch(gst_fssai_ChangeSuccess(res.data));
        })
        .catch((err) => {
            dispatch(gst_fssai_ChangeFailure(err?.response?.data?.message));
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
    numberChange,
    passwordChange,
    restaurantChange,
    gst_fssai_Change,
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
    PASSWORD_CHANGE_REQUEST,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAILURE,
    NUMBER_CHANGE_REQUEST,
    NUMBER_CHANGE_SUCCESS,
    NUMBER_CHANGE_FAILURE,
    RESTAURANT_CHANGE_REQUEST,
    RESTAURANT_CHANGE_SUCCESS,
    RESTAURANT_CHANGE_FAILURE,
    GST_FSSAI_CHANGE_REQUEST,
    GST_FSSAI_CHANGE_SUCCESS,
    GST_FSSAI_CHANGE_FAILURE
};
