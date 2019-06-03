import React from 'react';
import { Link, } from 'react-router-dom';
import Logo from '../../../assets/images/react-logo.png';
import ajLogo from '../../../assets/images/ajlogo1.png';
import { HeaderThemed, HeaderTitle, LogoImage, LinkBox, LogoContainer, AJLogo, CenterContainer, } from './style';

const Header = () => {
	return (
		<HeaderThemed>
			<LogoContainer>
				<Link to="/">
					<AJLogo src={ajLogo} />
				</Link>
			</LogoContainer>
			<CenterContainer>
				<LogoImage src={Logo} />
				<HeaderTitle>React Code Examples</HeaderTitle>
			</CenterContainer>
			<LinkBox>
				<Link to="/login">login</Link>
			</LinkBox>
		</HeaderThemed>
	)
}

export default Header;