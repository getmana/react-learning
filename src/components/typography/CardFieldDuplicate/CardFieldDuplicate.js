import React from 'react';
import PropTypes from 'prop-types';
import { SpanThemed, } from './style';

const CardFieldDuplicate = ({ className, value, active, }) => {
	return (
		<div className={className}>
			<SpanThemed>
				<span className={active ? 'active' : ''}>{value}</span>
			</SpanThemed>
		</div>
	)
}

export default CardFieldDuplicate;

CardFieldDuplicate.propTypes = {
	className: PropTypes.string.isRequired,
	value: PropTypes.string,
	active: PropTypes.bool,
}
CardFieldDuplicate.defaultProps = {
	value: '',
}