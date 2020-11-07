import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import user from "./Admin/reducer";

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ user }),
    createComposer(applyMiddleware(thunk))
);

export default store;
