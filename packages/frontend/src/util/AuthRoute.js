import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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

AuthRoute.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	isAuth: state.user.isAuth,
});

export default connect(mapStateToProps)(AuthRoute);
