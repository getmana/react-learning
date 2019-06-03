import React from 'react';
import { Link, } from 'react-router-dom';
import Logo from '../../../assets/images/react-logo.png';
import { HeaderThemed, HeaderTitle, LogoImage, LinkBox, } from './style';

const Header = () => {
	return (
		<HeaderThemed>
			<Link to="/"><LogoImage src={Logo} /></Link>
			<HeaderTitle>Hello from React</HeaderTitle>
			<LinkBox>
				<Link to="/login">login</Link>
			</LinkBox>
		</HeaderThemed>
	)
}

export default Header;