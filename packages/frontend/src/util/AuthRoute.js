import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, isAuth, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuth ? <Redirect to="/" /> : <Component {...props} />
		}
	/>
);

const mapStateToProps = (state) => ({
	user: state.user,
	isAuth: state.user.isAuth,
});
export default connect(mapStateToProps)(AuthRoute);
