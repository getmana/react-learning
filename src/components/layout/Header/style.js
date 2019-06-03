import styled from 'styled-components';

const HeaderThemed = styled.header`
	color: ${props => props.theme.primary};
	background-color: ${props => props.theme.secondaryBg};
	justify-content: space-between;
	padding: 30px 20px;
	display: flex;
	position: relative;

	@media screen and (max-width: 625px) {
		flex-direction: column;
		justify-content: center;
	}
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
	padding-top: 15px;

	a {
		color: ${props => props.theme.primary};
	}
`;

const LogoContainer = styled.div``;

const CenterContainer = styled.div`
	display: flex;
`;

const AJLogo = styled.img`
	height: 50px;
`;

export {
	HeaderThemed, HeaderTitle, LogoImage, LinkBox, LogoContainer, AJLogo, CenterContainer
}