import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardThemed = styled.div`
    flex-basis: 300px;
    border: 2px solid ${props => props.theme.primary};
    text-align: center;
    margin: 10px;
`;

const CardTitle = styled.div`
    color: #fff;
    background-color: ${props => props.theme.primary};
    padding: 10px;
`;

const CardContent = styled.div`
    padding: 20px;
    line-height: 1.5em;
`;

const Card = ({ title, content, }) => {
	return (
		<CardThemed>
			<CardTitle>{title}</CardTitle>
			<CardContent>{content}</CardContent>
		</CardThemed>
	)
}

export default Card;

Card.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
}