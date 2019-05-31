import React from 'react';
import PropTypes from 'prop-types';
import { TitleThemed, } from './style';

const Title = ({ children, }) => {
	return (
		<TitleThemed>{children}</TitleThemed>
	)
}

export default Title;

Title.propTypes = {
	children: PropTypes.string.isRequired,
}