import {
	SET_USER,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	LOADING_UI,
	SET_ERRORS,
	CLEAR_ERRORS,
} from '../types';
import axios from 'axios';

export const loginUser =
	({ email, password }, history) =>
	(dispatch) => {
		dispatch({ type: LOADING_UI });
		axios
			.post('/signup', { email, password })
			.then((res) => {
				setAuthorizationHeader(res.data.token);
				dispatch(getUserData());
				dispatch({ type: CLEAR_ERRORS });
				history.push('/');
			})
			.catch((err) => {
				dispatch({
					type: SET_ERRORS,
					payload: err.response.data,
				});
			});
	};

export const signupUser =
	({ name, email, password }, history) =>
	(dispatch) => {
		dispatch({ type: LOADING_UI });
		axios
			.post('/signup', { name, email, password })
			.then((res) => {
				setAuthorizationHeader(res.data.token);
				dispatch(getUserData());
				dispatch({ type: CLEAR_ERRORS });
				history.push('/');
			})
			.catch((err) => {
				dispatch({
					type: SET_ERRORS,
					payload: err.response.data,
				});
			});
	};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('AuthToken');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
	dispatch({ type: LOADING_USER });
	axios
		.get('/user')
		.then((res) => {
			dispatch({
				type: SET_USER,
				payload: res.data,
			});
		})
		.catch((err) => console.error(err));
};

const setAuthorizationHeader = (token) => {
	const AuthToken = `Bearer ${token}`;
	localStorage.setItem('AuthToken', AuthToken);
	axios.defaults.headers.common['Authorization'] = AuthToken;
};
