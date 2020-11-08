import {
    SET_COMPETITOR_REQUEST,
    SET_COMPETITOR_SUCCESS,
    SET_COMPETITOR_FAILURE,
} from "../User/action";
import { saveData, loadData } from "../localStorage";

const initStore = {

};

const appReducer = (state = initStore, { type, payload }) => {
    switch (type) {
        case SET_COMPETITOR_REQUEST:
            return {
                ...state,
            };
        case SET_COMPETITOR_SUCCESS:
            return {
                ...state,

            };
        case SET_COMPETITOR_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }
};
export default appReducer;
