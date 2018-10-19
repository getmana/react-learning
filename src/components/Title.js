import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleThemed = styled.h2`
    color: ${props => props.theme.primary};
    font-size: 22px;
    margin: 22px 10px;
`;

const Title = ({ children, }) => {
	return (
		<TitleThemed>{children}</TitleThemed>
	)
}

export default Title;

Title.propTypes = {
	children: PropTypes.string.isRequired,
}