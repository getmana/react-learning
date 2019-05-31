import React from 'react';
import PropTypes from 'prop-types';
import { FooterThemed, } from './style';

const Footer = ({ children, }) => {
	return (
		<FooterThemed>
			{children}
		</FooterThemed>
	)
}

export default Footer;

Footer.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
}