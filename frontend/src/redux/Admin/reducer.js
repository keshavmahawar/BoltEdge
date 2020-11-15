import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_LOGOUT
} from "./action";
import { saveData, loadData, removeData } from "../localStorage";

const initState = {
    authToken: null,
    isAuth: true
}

const adminReducer = (
    state = loadData("authToken") || initState,
    { type, payload }
) => {
    switch (type) {
        case ADMIN_LOGIN_REQUEST:
            return {
                ...state,
            };
        case ADMIN_LOGIN_SUCCESS:
            let authToken = "Bearer" + payload.authToken
            saveData("authToken", authToken);
            return {
                ...state,
                authToken: authToken,
                isAuth: true
            };
        case ADMIN_LOGIN_FAILURE:
            return {
                ...state,
            };
        case ADMIN_LOGIN_LOGOUT:
            removeData("authToken");
            return {
                ...state,
                authToken: authToken,
            };
        default: {
            return state
        }
    }
};

export default adminReducer;

