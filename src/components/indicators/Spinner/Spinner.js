import React from 'react';
import PropTypes from 'prop-types';
import { SpinnerThemed, } from './style';

const Spinner = ({ size, }) => {
	return (
		<SpinnerThemed className="spinner" size={size} />
	)
}

export default Spinner;

Spinner.propTypes = {
	size: PropTypes.string,
}