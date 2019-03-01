import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PageTitleThemed = styled.h1`
	color: ${props => props.theme.primary};
	font-size: 28px;
	margin: 28px 10px;
`;

const PageTitle = ({ children, }) => {
	return (
		<PageTitleThemed>{children}</PageTitleThemed>
	)
}

export default PageTitle;

PageTitle.propTypes = {
	children: PropTypes.string.isRequired,
}