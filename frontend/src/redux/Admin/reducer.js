import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
} from "./action";
import { saveData, loadData } from "../localStorage";
const initStore = {
    authToken: loadData("userToken") || null,
};

const authReducer = (state = initStore, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
            };
        case LOGIN_SUCCESS:
            saveData("userToken", "Bearer " + payload);
            return {
                ...state,
                authToken: "Bearer " + payload,
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
