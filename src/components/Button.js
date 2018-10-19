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
	color: ${props => props.theme[`${props.btnType}`]};
    border: 2px solid ${props => props.theme[`${props.btnType}`]};
    width: 100%;

    :hover {
        cursor: ${props => props.btnType === 'unactive' ? 'default' : 'pointer'};
        color: ${props => props.btnType === 'unactive' ? props.theme.unactive : '#fff'};
        background: ${props => props.btnType === 'unactive' ? 'transparent' : props.theme[`${props.btnType}`]};
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

const Button = ({ children, btnType, loading, onClick, }) => {
	return (
		<ButtonBox>
			<ButtonThemed btnType={btnType} onClick={onClick}>{children}</ButtonThemed>
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
	btnType: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	loading: PropTypes.bool,
}