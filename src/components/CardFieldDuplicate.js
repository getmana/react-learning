import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SpanThemed = styled.span`
	color: grey;

	.active {
			color: #fff;
	}
`;

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