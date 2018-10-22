import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardThemed = styled.div`
    flex-basis: 300px;
    border: 2px solid ${props => props.theme.primary};
    text-align: center;
    margin: 10px;
`;

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