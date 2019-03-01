import React, { Component, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

class InputElement extends Component {
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

export default InputElement;

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