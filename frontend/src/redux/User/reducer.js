import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
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
        default:
            return state;
    }
};
export default userReducer;
