import styled from 'styled-components';

const HeaderThemed = styled.header`
	color: #fff;
	background-color: ${props => props.theme.primary};
	justify-content: center;
	padding: 5vh 0;
	display: flex;
	position: relative;
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

export {
	HeaderThemed, HeaderTitle, LogoImage, LinkBox
}