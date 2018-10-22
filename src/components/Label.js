import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelThemed = styled.label`
    color: ${props => props.theme.primary};
`;

const Label = ({ label, }) => {
	return (
		<LabelThemed>{label || ''}</LabelThemed>
	)
}

export default Label;

Label.propTypes = {
	label: PropTypes.string,
}