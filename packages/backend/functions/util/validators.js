const isEmpty = require('lodash/isEmpty');

const isEmail = (email) =>
	email.match(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	);

exports.validateSignupData = ({ name, email, password, confirmPassword }) => {
	const errors = {};

	if (isEmpty(name)) errors.name = 'This field is required';

	if (isEmpty(email)) {
		errors.email = 'This field is required';
	} else if (!isEmail(email)) {
		errors.email = 'Please provide a valid email address';
	}

	if (isEmpty(password)) errors.password = 'This field is required';
	if (password !== confirmPassword)
		errors.confirmPassword = 'Passwords must match';

	return {
		errors,
		valid: isEmpty(errors),
	};
};

exports.validateLoginData = ({ email, password }) => {
	const errors = {};

	if (isEmpty(email)) errors.email = 'This field is required';
	if (isEmpty(password)) errors.password = 'This field is required';

	return {
		errors,
		valid: isEmpty(errors),
	};
};

exports.validateNewTaskData = ({ title, content }) => {
	const errors = {};

	if (isEmpty(title)) errors.title = 'This field is required';
	if (isEmpty(content)) errors.content = 'This field is required';

	return {
		errors,
		valid: isEmpty(errors),
	};
};
