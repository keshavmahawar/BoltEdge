import {
    GET_COMPETITOR_REQUEST,
    GET_COMPETITOR_SUCCESS,
    GET_COMPETITOR_FAILURE,
    SET_COMPETITOR_REQUEST,
    SET_COMPETITOR_SUCCESS,
    SET_COMPETITOR_FAILURE,
} from "./action";
import { saveData, loadData } from "../localStorage";

const initStore = {
    isLoading: true,
    allCompetitors: []
};

const appReducer = (state = initStore, { type, payload }) => {
    switch (type) {
        case GET_COMPETITOR_REQUEST:
            return {
                ...state,
            };
        case GET_COMPETITOR_SUCCESS:
            return {
                ...state,
                isLoding: false,
                allCompetitors: [payload, ...state.allCompetitors]
            };
        case GET_COMPETITOR_FAILURE:
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
