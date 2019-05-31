import React, { Fragment, } from 'react';
import { createPortal, } from 'react-dom';
import PropTypes from 'prop-types';
import { outerStyle, } from './style';

const Portal = ({ children, onClose, portalStyle, }) =>
	createPortal(
		<Fragment>
			<div style={outerStyle} onClick={onClose} />
			<div style={portalStyle}>
				{children}
			</div>
		</Fragment>,
		document.getElementById('portal')
	);

export default Portal;

Portal.propTypes = {
	onClose: PropTypes.func.isRequired,
	portalStyle: PropTypes.objectOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	])).isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
}