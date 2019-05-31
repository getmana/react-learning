import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SpinnerThemed = styled.div`
  display: inline-block;
  position: relative;
  max-width: 64px;
  max-height: 64px;

  :after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 0;
    box-sizing: border-box;
    border: ${props => props.size} solid ${props => props.theme.primary};
    border-color: ${props => props.theme.primary} transparent ${props => props.theme.primary} transparent;
    animation: spinner 1.2s infinite;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
  
`;

const Spinner = ({ size, }) => {
	return (
		<SpinnerThemed className="spinner" size={size} />
	)
}

export default Spinner;

Spinner.propTypes = {
	size: PropTypes.string,
}