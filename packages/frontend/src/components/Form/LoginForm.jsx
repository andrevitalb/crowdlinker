import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.styles.scss';

// Components
import TextField from '../common/FormFields/TextField';
import Button from '../common/Button/';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';

// MUI
import { Typography } from '@mui/material';

const initialValues = {
	email: '',
	password: '',
};

const LoginForm = ({ ui, loginUser }) => {
	const { loading, errors } = ui;
	const [userData, setUserData] = useState(initialValues);

	const handleChange = (e) =>
		setUserData({ ...userData, [e.target.name]: e.target.value });
	const handleLogin = (e) => {
		e.preventDefault();
		loginUser(userData);
	};

	return (
		<div className="form">
			<div className="form__container col-12 col-md-6 col-lg-4">
				<Typography variant="h2" className="form__title text-center">
					Log In
				</Typography>
				<form className="form__input-container">
					<TextField
						name="email"
						type="email"
						text="Email"
						value={userData.email}
						onChange={handleChange}
						helperText={errors.email}
						error={!!errors.email}
						fullWidth
					/>
					<TextField
						name="password"
						type="password"
						text="Password"
						value={userData.password}
						onChange={handleChange}
						helperText={errors.password}
						error={!!errors.password}
						fullWidth
					/>
					{errors.general && (
						<Typography variant="body2" className="generalError">
							{errors.general}
						</Typography>
					)}
					<Button
						loading={loading}
						disabled={loading}
						onClick={handleLogin}
						fullWidth
					>
						Log In
					</Button>
				</form>
				<div className="form__footer text-center">
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	ui: state.ui,
});
export default connect(mapStateToProps, { loginUser })(LoginForm);
