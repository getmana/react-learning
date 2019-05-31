import styled from 'styled-components';

const InputThemed = styled.input`
	border: none;
	outline: none;
	padding: 0.4em 1em;
	border-bottom: 2px solid ${props => props.disabled ? props.theme.unactive : props.theme.primary};
	border: ${props => props.readOnly ? 'none' : ''};
	color: ${props => props.disabled ? props.theme.unactive : props.theme.primary};
	background-color: transparent;
	box-sizing: border-box;
	width: 100%;
	
	::placeholder {
		color: ${props => props.theme.primary};
	}
`;

export {
	InputThemed
}