import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.styles.scss';

// Components
import TextField from '../common/FormFields/TextField';
import Button from '../common/Button/';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions/userActions';

// MUI
import { Typography } from '@mui/material';

const initialValues = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignupForm = ({ ui, signupUser }) => {
	const { loading, errors } = ui;
	const [userData, setUserData] = useState(initialValues);

	const handleChange = (e) =>
		setUserData({ ...userData, [e.target.name]: e.target.value });
	const handleSignup = (e) => {
		e.preventDefault();
		signupUser(userData);
	};

	return (
		<div className="form">
			<div className="form__container col-12 col-md-6 col-lg-4">
				<Typography variant="h2" className="form__title text-center">
					Sign Up
				</Typography>
				<form className="form__input-container">
					<TextField
						name="name"
						type="text"
						text="Name"
						value={userData.name}
						onChange={handleChange}
						helperText={errors.name}
						error={!!errors.name}
						fullWidth
					/>
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
					<TextField
						name="confirmPassword"
						type="password"
						text="Confirm Password"
						value={userData.confirmPassword}
						onChange={handleChange}
						helperText={errors.confirmPassword}
						error={!!errors.confirmPassword}
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
						onClick={handleSignup}
						fullWidth
					>
						Sign Up
					</Button>
				</form>
				<div className="form__footer text-center">
					Already have an account? <Link to="/login">Log In</Link>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	ui: state.ui,
});
export default connect(mapStateToProps, { signupUser })(SignupForm);
