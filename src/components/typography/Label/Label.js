import React from 'react';
import PropTypes from 'prop-types';
import { LabelThemed, } from './style';

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