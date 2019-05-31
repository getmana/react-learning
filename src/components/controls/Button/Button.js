import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, } from '../../../components';
import { ButtonBox, ButtonThemed, SpinnerBox, } from './style';

const Button = ({ children, style, type, loading, onClick, disabled, iconButton, }) => {
	return (
		<ButtonBox iconButton={iconButton}>
			<ButtonThemed
				iconButton={iconButton}
				type={type}
				styles={style}
				disabled={disabled}
				onClick={onClick}
			>
				{children}
			</ButtonThemed>
			<SpinnerBox>
				{
					loading && <Spinner size="12px" />
				}
			</SpinnerBox>
		</ButtonBox>
	)
}

export default Button;

Button.propTypes = {
	style: PropTypes.oneOf([ 'primary', 'secondary' ]),
	type: PropTypes.string,
	onClick: PropTypes.func,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
	]),
	iconButton: PropTypes.bool,
}
Button.defaultProps = {
	type: 'button',
}