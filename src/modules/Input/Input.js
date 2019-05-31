import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Label, InputElement, } from '../../components';
import { InputComponent, InputBox, IconBox, IconThemed, TooltipThemed, ErrorMessage, } from './style';

export default class Input extends Component {
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
			readOnly,
		} = this.props;
		const { touched, error, warning, } = meta || {};

		return (
			<InputComponent disabled={disabled}>
				<Label label={label} disabled={disabled} style={style} />
				<InputBox>
					<InputElement
						disabled={disabled}
						readOnly={readOnly}
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