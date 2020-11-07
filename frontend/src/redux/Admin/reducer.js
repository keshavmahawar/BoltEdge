import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
} from "./action";
import { saveData, loadData } from "../localStorage";

const initStore = {
    authToken: loadData("authToken") || null,
    isVerified: false,
    isPaid: false,
    restaurant: null,
    _id: "",
    email: "",
    password: "",
    name: "",
    competitor: [],
    date: "",
};

const authReducer = (state = initStore, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
            };
        case LOGIN_SUCCESS:
            saveData("authToken", "Bearer " + payload.authToken);
            return {
                ...state,
                authToken: "Bearer " + payload.authToken,
                isVerified: payload.user.isVerified,
                isPaid: payload.user.isPaid,
                restaurant: payload.user.restaurant,
                _id: payload.user._id,
                email: payload.user.email,
                password: payload.user.password,
                name: payload.user.name,
                competitor: payload.user.competitor,
                date: payload.user.date,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
            };
        case LOGIN_LOGOUT:
            return {
                ...state,
                authToken: null,
            };
        default:
            return state;
    }
};
export default authReducer;
