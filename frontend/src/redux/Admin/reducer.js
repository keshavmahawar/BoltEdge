import {
    REGISTER_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_LOGOUT,
} from "./action";
import { saveData, loadData } from "../localStorage";
const initStore = {
    authToken: loadData("userToken") || null,
    isRegister: false
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
        case REGISTER_REQUEST:
                return {
                    ...state
                };
        case REGISTER_SUCCESS:
                return {
                    ...state,
                    isRegister:true
                };
        case REGISTER_FAILURE:
                return {
                    ...state,
                };
        default:
            return state;
    }
};
export default authReducer;
