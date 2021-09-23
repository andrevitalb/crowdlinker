import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	user: state.user,
	isAuth: state.user.isAuth,
});
export default connect(mapStateToProps)(ProtectedRoute);
