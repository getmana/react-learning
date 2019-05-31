import styled from 'styled-components';

const CardThemed = styled.div`
	flex-basis: 300px;
	border: 2px solid ${props => props.theme.primary};
	text-align: center;
	margin: 10px;
`;

export {
	CardThemed
}