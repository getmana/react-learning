import styled from 'styled-components';

const MainSectionThemed = styled.section`
	flex: 1;
	display: flex;
	flex-wrap: wrap;
	background-color: ${props => props.theme.bg}; 
`;

export {
	MainSectionThemed
}