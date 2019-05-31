import styled from 'styled-components';

const LabelThemed = styled.label`
  color: ${props => props.disabled ? props.theme.unactive : props.theme.primary};
`;

export {
	LabelThemed
}