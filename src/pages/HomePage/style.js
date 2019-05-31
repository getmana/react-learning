import styled from 'styled-components';

const ContentThemed = styled.main`
	padding: 20px;
	flex: 1 0 280px;
`;

const CardContainer = styled.section`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
`;

const CardTitle = styled.div`
	color: #fff;
	background-color: ${props => props.theme.primary};
	padding: 10px;
`;

const CardContent = styled.div`
	padding: 20px;
	line-height: 1.5em;
`;

const InputContainer = styled.div`
  display: flex;
	flex-direction: column;
	max-width: 300px;
`;

export {
	ContentThemed, CardContainer, CardTitle, CardContent, InputContainer
}