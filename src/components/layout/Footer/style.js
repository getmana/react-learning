import styled from 'styled-components';

const FooterThemed = styled.footer`
	padding: 1vh 0;
	color: #fff;
	background-color: ${props => props.theme.primary};
	text-align: center;
`;

export {
	FooterThemed
}