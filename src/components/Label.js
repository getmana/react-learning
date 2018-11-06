import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelThemed = styled.label`
    color: ${props => props.disabled ? props.theme.unactive : props.theme.primary};
`;

const Label = ({ label, disabled, style, }) => {
	return (
		<LabelThemed disabled={disabled} style={style}>{label || ''}</LabelThemed>
	)
}

export default Label;

Label.propTypes = {
	label: PropTypes.string,
	disabled: PropTypes.bool,
	style: PropTypes.objectOf(PropTypes.string),
}
Label.defaultProps = {
	style: {},
}