import styled from 'styled-components';

const HeaderThemed = styled.header`
	color: #fff;
	background-color: ${props => props.theme.primary};
	justify-content: center;
	padding: 5vh 0;
	display: flex;
	position: relative;
`;

export {
	HeaderThemed
}