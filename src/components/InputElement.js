import React from 'react';
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

const InputElement = ({ type, value, onChange, openDropdown, }) => {
	return (
		<InputThemed
			type={type}
			value={value}
			onChange={onChange}
			onClick={openDropdown
				? (e) => openDropdown(e.target.getBoundingClientRect())
				: null}
		/>
	)
}

export default InputElement;

InputElement.propTypes = {
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	openDropdown: PropTypes.func,
	value: PropTypes.string,
}