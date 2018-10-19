import React from 'react';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import Logo from '../images/react-logo.png';

const HeaderThemed = styled.header`
    color: #fff;
    background-color: ${props => props.theme.primary};
    justify-content: center;
    padding: 5vh 0;
    display: flex;
`;

const HeaderTitle = styled.h1`
    font-size: 36px;
    padding-top: 5px;
`;

const LogoImage = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

const Header = () => {
	return (
		<HeaderThemed>
			<Link to="#"><LogoImage src={Logo} /></Link>
			<HeaderTitle>Hello from React</HeaderTitle>
		</HeaderThemed>
	)
}

export default Header;