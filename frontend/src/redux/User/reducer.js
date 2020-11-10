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
    phoneNo: "",
    gstNo: "",
    fssaiNo: "",
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
                phoneNo: payload.user.phoneNo,
                gstNo: payload.user.gstNo,
                fssaiNo: payload.user.fssaiNo,
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
        case NUMBER_CHANGE_REQUEST:
            return {
                ...state,
            };
        case NUMBER_CHANGE_SUCCESS:
            return {
                ...state,
                phoneNo: payload.user.phoneNo,
            };
        case NUMBER_CHANGE_FAILURE:
            return {
                ...state,
            };
        case PASSWORD_CHANGE_REQUEST:
            return {
                ...state,
            };
        case PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
            };
        case PASSWORD_CHANGE_FAILURE:
            return {
                ...state,
            };
        case RESTAURANT_CHANGE_REQUEST:
            return {
                ...state,
            };
        case RESTAURANT_CHANGE_SUCCESS:
            return {
                ...state,
            };
        case RESTAURANT_CHANGE_FAILURE:
            return {
                ...state,
            };
        case GST_FSSAI_CHANGE_REQUEST:
            return {
                ...state,
            };
        case GST_FSSAI_CHANGE_SUCCESS:
            return {
                ...state,
                gstNo: payload.user.gstNo,
                fssaiNo: payload.user.fssaiNo
            };
        case GST_FSSAI_CHANGE_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }
};
export default userReducer;
