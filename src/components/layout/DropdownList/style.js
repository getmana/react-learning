import styled from 'styled-components';

const ListThemed = styled.ul`
	display: flex;
	flex-direction: column;
	border: 2px solid ${props => props.theme.primary};
	color: ${props => props.theme.primary};
	background-color: ${props => props.theme.secondaryBg};
`;

export {
	ListThemed
}