import styled from 'styled-components';

const PaginationBox = styled.div`
	text-align: center;
	color: ${props => props.theme.primary};
	padding: 10px 0;

	.material-icons {
		position: relative;
		top: 6px;
		cursor: pointer;
	}

	.disabled.material-icons {
		cursor: auto;
	}

	span {
		padding: 0 10px;
		cursor: pointer;
		font-weight: 500;
	}

	span.active {
		color: ${props => props.theme.secondaryBg};
		cursor: auto;
		font-weight: 600;
	}
`;

export {
	PaginationBox
}