import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
    SET_RESTAURANT_REQUEST,
    SET_RESTAURANT_SUCCESS,
    SET_RESTAURANT_FAILURE,
    SET_COMPETITOR_REQUEST,
    SET_COMPETITOR_SUCCESS,
    SET_COMPETITOR_FAILURE,
} from "./action";
import { saveData, loadData, removeData } from "../localStorage";

const initStore = {
    authToken: null,
    isVerified: false,
    isPaid: false,
    restaurant: null,
    _id: "",
    email: "",
    name: "",
    competitor: [],
};

const userReducer = (
    state = loadData("userData") || initStore,
    { type, payload }
) => {
    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
            };
        case LOGIN_SUCCESS:
            let userData = {
                authToken: "Bearer " + payload.authToken,
                isVerified: payload.user.isVerified,
                isPaid: payload.user.isPaid,
                restaurant: payload.user.restaurant,
                _id: payload.user._id,
                email: payload.user.email,
                name: payload.user.name,
                competitor: payload.user.competitor,
            };
            saveData("userData", userData);
            return {
                ...state,
                ...userData,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
            };
        case LOGIN_LOGOUT:
            removeData("userData");
            return {
                ...state,
                ...initStore,
            };
        case SET_RESTAURANT_REQUEST:
            return {
                ...state,
            };
        case SET_RESTAURANT_SUCCESS:
            return {
                ...state,
                restaurant: payload,
                competitor: [],
            };
        case SET_RESTAURANT_FAILURE:
            return {
                ...state,
            };
        case SET_COMPETITOR_REQUEST:
            return {
                ...state,
            };
        case SET_COMPETITOR_SUCCESS:
            return {
                ...state,
                competitor: payload,
            };
        case SET_COMPETITOR_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }
};
export default userReducer;
