import styled from 'styled-components';

const SidebarThemed = styled.aside`
	flex: none;
	display: flex;
	flex-direction: column;
	min-width: 250px;
	padding: 20px;
`;

const LiThemed = styled.li`
	padding: 5px 20px;

	a {
		color: ${props => props.theme.primary};
	}

	a:hover {
		color: ${props => props.theme.secondary};
	}

`;

export {
	SidebarThemed, LiThemed
}