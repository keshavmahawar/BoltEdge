import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./User/reducer";
import adminReducer from "./Admin/reducer";

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ user: userReducer, admin: adminReducer }),
    createComposer(applyMiddleware(thunk))
);

export default store;
