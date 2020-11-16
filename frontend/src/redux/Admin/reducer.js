import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_LOGOUT
} from "./action";
import { saveData, loadData, removeData } from "../localStorage";

const initState = () => {
    if (loadData("adminAuthToken")) {
        return { adminAuthToken: loadData("adminAuthToken") }
    }
    return { adminAuthToken: null }
}

const adminReducer = (
    state = initState(),
    { type, payload }
) => {
    switch (type) {
        case ADMIN_LOGIN_REQUEST:
            return {
                ...state,
            };
        case ADMIN_LOGIN_SUCCESS:
            let adminAuthToken = "Bearer" + " " + payload.authToken
            saveData("adminAuthToken", adminAuthToken);
            return {
                ...state,
                adminAuthToken: adminAuthToken
            };
        case ADMIN_LOGIN_FAILURE:
            return {
                ...state,
            };
        case ADMIN_LOGIN_LOGOUT:
            removeData("adminAuthToken");
            return {
                ...state,
                ...initState()

            };
        default: {
            return state
        }
    }
};


export default adminReducer;

