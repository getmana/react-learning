import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FooterThemed = styled.footer`
    padding: 1vh 0;
    color: #fff;
    background-color: ${props => props.theme.primary};
    text-align: center;
`;

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