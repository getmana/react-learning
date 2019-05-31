import styled from 'styled-components';

const DropdownThemed = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 300px;
	padding: 20px 10px;
	box-sizing: border-box;
	color: ${props => props.theme.primary};
	position: relative;

	.readonly-dropdown i {
		display: none;
	}
`;

const InputBox = styled.div`
	width: 100%;
	display: flex;
`;

const Icon = styled.i`
	color: ${props => props.disabled ? props.theme.unactive : props.theme.primary};
`;

const portalInitStyle = {
	position: 'fixed',
	zIndex: '10',
	fontFamily: 'Roboto, sans-serif',
	width: '280px',
};

const ErrorMessage = styled.div`
	color: red;
	font-size: 12px;
`;

export {
	DropdownThemed, InputBox, Icon, portalInitStyle, ErrorMessage
}