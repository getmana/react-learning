import styled from 'styled-components';

const ItemThemed = styled.li`
	padding: 0.4em 1em;
	cursor: pointer;

	:hover {
		background-color: ${props => props.theme.unactive};
	}
`;

export {
	ItemThemed
}