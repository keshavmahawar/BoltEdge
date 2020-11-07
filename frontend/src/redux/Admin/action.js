import axios from '../../requests/request';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_LOGOUT,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE
} from './actionTypes';

const loginRequest = (payload) => {
	return {
		type: LOGIN_REQUEST,
		payload
	};
};

const loginSuccess = (payload) => {
	return {
		type: LOGIN_SUCCESS,
		payload
	};
};

const loginFailure = (payload) => {
	return {
		type: LOGIN_FAILURE,
		payload
	};
};
const loginLogout = () => {
	return {
		type: LOGIN_LOGOUT
	};
};

const loginAdmin = (payload) => (dispatch) => {};

const registerRequest = (payload) => {
	return {
		type: REGISTER_REQUEST,
		payload
	};
};

const registerSuccess = (payload) => {
	return {
		type: REGISTER_SUCCESS,
		payload
	};
};

const registerFailure = (payload) => {
	return {
		type: REGISTER_FAILURE,
		payload
	};
};

const registerAdmin = (payload) => (dispatch) => {
    dispatch(registerRequest(payload))
    return axios.post("/user/register", payload)
        .then((res) => {
            dispatch(resgisterSuccess(res.data))
        })
        .catch((err) => {
            dispatch(registerFailure(err?.response?.data?.message))
        })
};


export {
	loginAdmin,
	loginFailure,
	loginRequest,
	loginSuccess,
	loginLogout,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_LOGOUT,
	registerAdmin,
	registerFailure,
	registerRequest,
	registerSuccess,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE
};
