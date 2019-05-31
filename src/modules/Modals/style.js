import styled from 'styled-components';

const ModalThemed = styled.div`
	height: 100%;
	text-align: center;
	border: 2px solid ${props => props.theme.primary};
	background-color: ${props => props.theme.secondaryBg};
`;

const ModalTitle = styled.div`
	color: #fff;
	background-color: ${props => props.theme.primary};
	padding: 10px;
`;

const ModalContent = styled.div`
	display: flex;
	height: 100%;
	padding: 0 20%;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`;

const ButtonBox = styled.div`
  display: flex;
	width: 100%;
	justify-content: space-around;

	button {
		max-width: 150px;
	}
`;

const TitleThemed = styled.h3`
	color: ${props => props.theme.primary};
	font-size: 22px;
`;

const portalInitStyle = {
	position: 'fixed',
	zIndex: '10',
	fontFamily: 'Roboto, sans-serif',
	width: '40%',
	height: '40vh',
	top: '30vh',
	left: '30%',
};

const LabelThemed = styled.label`
	padding: 0 20px;
	cursor: pointer;
`;

export {
	ModalContent, ModalThemed, ModalTitle, ButtonBox, TitleThemed, portalInitStyle, LabelThemed
}