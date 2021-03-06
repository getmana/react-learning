import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Button, Portal, } from '../../components';
import CenteredModal from './CenteredModal';
import { portalInitStyle, } from './style';

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