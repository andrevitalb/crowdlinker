import {
	ADD_ARTICLE,
	SET_ARTICLES,
	LOADING_ARTICLES,
	LOADING_UI,
	SET_ERRORS,
	CLEAR_ERRORS,
} from '../types';
import axios from 'axios';

export const getArticles = () => (dispatch) => {
	dispatch({ type: LOADING_ARTICLES });
	axios
		.get('/articles')
		.then((res) => {
			dispatch({
				type: SET_ARTICLES,
				payload: res.data,
			});
		})
		.catch((err) => console.error(err));
};

export const addArticle = (articleData) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/article', articleData)
		.then((res) => {
			dispatch({
				type: ADD_ARTICLE,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
			dispatch({ type: CLEAR_ERRORS });
		});
};
