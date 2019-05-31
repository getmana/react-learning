import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Button, } from '../../components';
import { ButtonBox, TitleThemed, } from './style';

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