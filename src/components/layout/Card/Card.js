import React from 'react';
import PropTypes from 'prop-types';
import { CardThemed, } from './style';

const Card = ({ children, }) => {
	return (
		<CardThemed>
			{children}
		</CardThemed>
	)
}

export default Card;

Card.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
}