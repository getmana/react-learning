import React from 'react';
import PropTypes from 'prop-types';
import { HeaderThemed, } from './style';

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