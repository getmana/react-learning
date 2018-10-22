import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

const ButtonBox = styled.div`
    position: relative;
    width: 100%;
`;

const ButtonThemed = styled.button`
	background: transparent;
	border-radius: 3px;
    padding: 0.4em 1em;
    margin: 10px 0;
	color: ${props => props.disabled ? props.theme.unactive : props.theme[`${props.type}`]};
    border: 2px solid ${props => props.disabled ? props.theme.unactive : props.theme[`${props.type}`]};
    width: 100%;
    outline: none;

    :hover {
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
        color: ${props => props.disabled ? props.theme.unactive : '#fff'};
        background: ${props => props.disabled ? 'transparent' : props.theme[`${props.type}`]};
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
`;

const Button = ({ children, type, loading, onClick, disabled, }) => {
	return (
		<ButtonBox>
			<ButtonThemed type={type} disabled={disabled} onClick={onClick}>{children}</ButtonThemed>
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
	type: PropTypes.oneOf([ 'primary', 'secondary' ]),
	onClick: PropTypes.func,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	children: PropTypes.string,
}