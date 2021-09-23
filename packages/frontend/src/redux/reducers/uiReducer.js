import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
	errors: {},
	message: {},
	loading: false,
};

const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_ERRORS:
			return {
				errors: { ...payload },
				message: {},
				loading: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				errors: {},
				loading: false,
			};
		case LOADING_UI:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};

export default uiReducer;
