import React from 'react';
import './spinner.styles.scss';

// MUI
import { CircularProgress } from '@mui/material';

const Spinner = ({ color = 'primary' }) => {
	return (
		<div className="spinner-container">
			<CircularProgress color={color} />
		</div>
	);
};

export default Spinner;
