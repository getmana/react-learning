import styled from 'styled-components';

const Page = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
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

const LinkBox = styled.div`
	position: absolute;
	padding: 15px 20px;
	right: 0;

	a {
		color: #fff;
	}

	@media screen and (max-width: 480px) {
		position: relative;
	}
`;

const portalInitStyle = {
	position: 'fixed',
	zIndex: '10',
	fontFamily: 'Roboto, sans-serif',
	width: '40%',
	height: '40vh',
	top: '30vh',
	left: '30%',
};

export {
	Page, HeaderTitle, LogoImage, LinkBox, portalInitStyle
}