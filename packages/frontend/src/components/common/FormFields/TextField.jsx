import React from 'react';
import './form-fields.styles.scss';
import classNames from 'classnames';

// MUI
import { TextField as MaterialTextField } from '@mui/material';

const TextField = ({ text, error, className, ...textFieldProps }) => {
	return (
		<MaterialTextField
			label={text}
			placeholder={text}
			className={classNames(className, 'input')}
			{...textFieldProps}
		/>
	);
};

export default TextField;
