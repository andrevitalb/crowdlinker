import React from 'react';
import './button.styles.scss';

// MUI
import { Button as MaterialButton, CircularProgress } from '@mui/material';

const Button = ({
	variant = 'contained',
	textColor = 'white',
	loading = false,
	className,
	children,
	...buttonProps
}) => {
	return (
		<MaterialButton
			variant={variant}
			className={`button ${className ?? ''}`}
			{...buttonProps}
		>
			{loading ? (
				<CircularProgress color="inherit" size={30} />
			) : (
				children
			)}
		</MaterialButton>
	);
};

export default Button;
