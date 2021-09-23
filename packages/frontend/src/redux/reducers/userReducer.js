import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
} from '../types';

const initialState = {
	credentials: {},
	isAuth: false,
	loading: false,
};

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USER:
			return {
				isAuth: true,
				loading: false,
				credentials: { ...payload },
			};
		case SET_AUTHENTICATED:
			return {
				...state,
				isAuth: true,
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		case LOADING_USER:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};

export default userReducer;
