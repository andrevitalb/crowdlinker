import { SET_ARTICLES, ADD_ARTICLE, LOADING_ARTICLES } from '../types';

const initialState = {
	articles: [],
	loading: false,
};

const dataReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_ARTICLES:
			return {
				...state,
				articles: payload,
				loading: false,
			};
		case ADD_ARTICLE:
			return {
				...state,
				articles: [...state.articles, payload],
			};
		case LOADING_ARTICLES:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};

export default dataReducer;
