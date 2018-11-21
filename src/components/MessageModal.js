import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Portal from './Portal';
import CenteredModal from './CenteredModal';

const portalInitStyle = {
	position: 'fixed',
	zIndex: '10',
	fontFamily: 'Roboto, sans-serif',
	width: '40%',
	height: '40vh',
	top: '30vh',
	left: '30%',
};

const MessageModal = ({ title, info, onClose, }) => {
	return (
		<Fragment>
			<Portal portalStyle={portalInitStyle} onClose={onClose}>
				<CenteredModal title={title}>
					<p>{info}</p>
					<Button style="primary" onClick={onClose}>Ok</Button>
				</CenteredModal>
			</Portal>
		</Fragment>
	)
}

export default MessageModal;

MessageModal.propTypes = {
	title: PropTypes.string,
	info: PropTypes.string,
	onClose: PropTypes.func.isRequired,
}
MessageModal.defaultProps = {
	title: '',
	info: '',
}