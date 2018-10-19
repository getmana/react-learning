import React from 'react';
import styled from 'styled-components';

const FooterThemed = styled.footer`
    padding: 1vh 0;
    color: #fff;
    background-color: ${props => props.theme.primary};
    text-align: center;
`;

const Footer = () => {
	return (
		<FooterThemed>
			<p>I'm a small footer &copy; 2018</p>
		</FooterThemed>
	)
}

export default Footer;