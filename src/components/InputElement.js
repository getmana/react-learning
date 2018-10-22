import React, { Component, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputThemed = styled.input`
    border: none;
    outline: none;
    padding: 0.4em 1em;
    border-bottom: 2px solid ${props => props.theme.primary};
    color: ${props => props.theme.primary};
    background-color: transparent;
    box-sizing: border-box;
    width: 100%;
`;

class InputElement extends Component {
	handleClick = (e) => {
		const { onOpenDropdown, } = this.props;

		if (onOpenDropdown) {
			onOpenDropdown(e.target.getBoundingClientRect())
		}
	}

	render() {
		const { type, value, onChange, } = this.props;

		return (
			<InputThemed
				type={type}
				value={value}
				onChange={onChange}
				onClick={this.handleClick}
			/>
		)
	}
}

export default InputElement;

InputElement.propTypes = {
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onOpenDropdown: PropTypes.func,
	value: PropTypes.string,
}