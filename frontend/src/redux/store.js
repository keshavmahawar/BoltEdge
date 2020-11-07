import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./User/reducer";
import appReducer from "./app/reducer";

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ app: appReducer, user: userReducer }),
    createComposer(applyMiddleware(thunk))
);

export default store;
