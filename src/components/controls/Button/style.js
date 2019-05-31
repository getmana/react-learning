import styled from 'styled-components';

const ButtonBox = styled.div`
	position: relative;
	width: ${props => props.iconButton ? '' : '100%'};
	padding: ${props => props.iconButton ? '15px 10px' : '10px'};
	box-sizing: border-box;
`;

const ButtonThemed = styled.button`
	background: transparent;
	border-radius: ${props => props.iconButton ? '50%' : '3px'};
	padding: ${props => props.iconButton ? '0.4em 0' : '0.4em 1em'}; 
	color: ${props => props.disabled ? props.theme.unactive : props.theme[`${props.styles}`]};
	border: 2px solid ${props => props.disabled ? props.theme.unactive : props.theme[`${props.styles}`]};
	width: ${props => props.iconButton ? '42px' : '100%'};
	outline: none;

	:hover {
		cursor: ${props => props.disabled ? 'default' : 'pointer'};
		color: ${props => props.disabled ? props.theme.unactive : '#fff'};
		background: ${props => props.disabled ? 'transparent' : props.theme[`${props.styles}`]};
	}
`;

const SpinnerBox = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 12px;
	text-align: center;
	background-color: ${props => props.theme.secondaryBg};
	opacity: 0.7;
	margin: 0 10px;
`;

export {
	ButtonBox, ButtonThemed, SpinnerBox
}