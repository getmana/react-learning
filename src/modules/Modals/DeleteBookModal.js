import React, { Fragment, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, } from '../../components';

const ButtonBox = styled.div`
  display: flex;
	width: 100%;
	justify-content: space-around;

	button {
		max-width: 150px;
	}
`;

const TitleThemed = styled.h3`
	color: ${props => props.theme.primary};
	font-size: 22px;
`;

const DeleteBookModal = ({ onDelete, onClose, bookTitle, }) => {
	return (
		<Fragment>
			<p>Do you really want to delete this book:</p>
			<TitleThemed>{bookTitle}</TitleThemed>
			<ButtonBox>
				<Button style="primary" onClick={onDelete}>Ok</Button>
				<Button style="primary" onClick={onClose}>Cancel</Button>
			</ButtonBox>
		</Fragment>
	)
}

export default DeleteBookModal;

DeleteBookModal.propTypes = {
	onDelete: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	bookTitle: PropTypes.string.isRequired,
}