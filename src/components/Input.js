import React, { Component, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Label from './Label';
import InputElement from './InputElement';

const InputComponent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px 10px;
	box-sizing: border-box;
	color: ${props => props.disabled ? props.theme.unactive : props.theme.primary};
`;

const InputBox = styled.div`
	width: 100%;
	display: flex;
`;

const IconBox = styled.div`
	position: relative;
	display: inline-block;

	.tooltip {
		visibility: hidden;
		width: 160px;
		background-color: ${props => props.theme.secondaryBg};
		color: ${props => props.theme.unactive};
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;
		position: absolute;
		right: 0;
		z-index: 1;
	}

	:hover {
		cursor: default;
		.tooltip {
			visibility: visible;
		}
	}
`;

const IconThemed = styled.i``;

const TooltipThemed = styled.div`
	::after {
		content: " ";
		position: absolute;
		bottom: 100%;  /* At the top of the tooltip */
		left: 95%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent ${props => props.theme.secondaryBg} transparent;
	}
`;

const ErrorMessage = styled.div`
	color: red;
	font-size: 12px;
`;

class Input extends Component {
	render() {
		const {
			type,
			label,
			icon,
			placeholder,
			input,
			meta,
			disabled,
			currentValue,
			onChange,
			style,
		} = this.props;
		const { touched, error, warning, } = meta || {};

		return (
			<InputComponent disabled={disabled}>
				<Label label={label} disabled={disabled} style={style} />
				<InputBox>
					<InputElement
						disabled={disabled}
						type={type}
						value={currentValue}
						placeholder={placeholder}
						style={style}
						onChange={onChange}
						{...input}
					/>
					{
						icon &&
							<IconBox>
								<IconThemed className="material-icons">{icon}</IconThemed>
								<TooltipThemed className="tooltip">{currentValue}</TooltipThemed>
							</IconBox>
					}

				</InputBox>
				{
					touched &&
					((error && <ErrorMessage>{error}</ErrorMessage>) ||
						(warning && <ErrorMessage>{warning}</ErrorMessage>))
				}
			</InputComponent>
		)
	}
}

export default Input;

Input.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string.isRequired,
	icon: PropTypes.string,
	errorMessage: PropTypes.string,
	placeholder: PropTypes.string,
	style: PropTypes.objectOf(PropTypes.string),
}

Input.defaultProps = {
	style: {},
}