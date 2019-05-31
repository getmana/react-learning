import React from 'react';
import PropTypes from 'prop-types';
import { ModalContent, ModalThemed, ModalTitle, } from './style';

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