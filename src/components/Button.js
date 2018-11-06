import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

const ButtonBox = styled.div`
    position: relative;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const ButtonThemed = styled.button`
	background: transparent;
	border-radius: 3px;
    padding: 0.4em 1em;
	color: ${props => props.disabled ? props.theme.unactive : props.theme[`${props.styles}`]};
    border: 2px solid ${props => props.disabled ? props.theme.unactive : props.theme[`${props.styles}`]};
    width: 100%;
    outline: none;

    :hover {
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
        color: ${props => props.disabled ? props.theme.unactive : '#fff'};
        background: ${props => props.disabled ? 'transparent' : props.theme[`${props.styles}`]};
      }
`;

const SpinnerBox = styled.div`
      position: absolute;
      left: 0;
      right: 0;
      top: 12px;
      text-align: center;
      background-color: ${props => props.theme.secondaryBg};
      opacity: 0.7;
      margin: 0 10px;
`;

const Button = ({ children, style, type, loading, onClick, disabled, }) => {
	return (
		<ButtonBox>
			<ButtonThemed
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
	children: PropTypes.string,
}
Button.defaultProps = {
	type: 'button',
}