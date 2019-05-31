import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { InputThemed, } from './style';

export default class InputElement extends Component {
	handleClick = (e) => {
		const { onOpenDropdown, } = this.props;

		if (onOpenDropdown) {
			onOpenDropdown(e.target.getBoundingClientRect())
		}
	}

	render() {
		const { type, value, onChange, placeholder, disabled, readOnly, style, onFocus, onBlur, } = this.props;

		return (
			<InputThemed
				disabled={disabled}
				readOnly={readOnly}
				type={type}
				value={value}
				placeholder={placeholder}
				style={style}
				onChange={onChange}
				onClick={this.handleClick}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		)
	}
}

InputElement.propTypes = {
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onOpenDropdown: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	placeholder: PropTypes.string,
	style: PropTypes.objectOf(PropTypes.string),
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
}

InputElement.defaultProps = {
	style: {},
}