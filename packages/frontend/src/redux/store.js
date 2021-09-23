import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
	user: userReducer,
	ui: uiReducer,
	data: dataReducer,
});

const store = createStore(
	reducers,
	initialState,
	compose(applyMiddleware(...middleware)),
);

export default store;
