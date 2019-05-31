import styled from 'styled-components';

const PageThemed = styled.div`
	padding: 20px;
	flex: 1 0 280px;
`;

const FormBox = styled.div`
`;

const ButtonBox = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;

	button {
		max-width: 300px;
	}
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

export {
	PageThemed, FormBox, ButtonBox, portalInitStyle
}