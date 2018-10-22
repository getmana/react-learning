import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderThemed = styled.header`
    color: #fff;
    background-color: ${props => props.theme.primary};
    justify-content: center;
    padding: 5vh 0;
    display: flex;
`;

const Header = ({ children, }) => {
	return (
		<HeaderThemed>
			{children}
		</HeaderThemed>
	)
}

export default Header;

Header.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
}