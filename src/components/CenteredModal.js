import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalThemed = styled.div`
	height: 100%;
	text-align: center;
	border: 2px solid ${props => props.theme.primary};
	background-color: ${props => props.theme.secondaryBg};
`;

const ModalTitle = styled.div`
	color: #fff;
	background-color: ${props => props.theme.primary};
	padding: 10px;
`;

const ModalContent = styled.div`
	display: flex;
	height: 100%;
	padding: 0 20%;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`;

const CenteredModal = ({ children, title, }) => {
	return (
		<ModalThemed>
			<ModalTitle>{title}</ModalTitle>
			<ModalContent>
				{children}
			</ModalContent>
		</ModalThemed>
	)
}

export default CenteredModal;

CenteredModal.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
}