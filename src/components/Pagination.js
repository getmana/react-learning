import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationBox = styled.div`
	text-align: center;
	color: ${props => props.theme.primary};
	padding: 10px 0;

	.material-icons {
		position: relative;
		top: 6px;
		cursor: pointer;
	}

	.disabled.material-icons {
		cursor: auto;
	}

	span {
		padding: 0 10px;
		cursor: pointer;
		font-weight: 500;
	}

	span.active {
		color: ${props => props.theme.secondary};
		cursor: auto;
		font-weight: 600;
	}
`;

const Pagination = ({ pageNumber, pages, length, onPrevClick, onNextClick, onPageNumberClick, }) => {
	return (
		<PaginationBox>
			<i
				className={pageNumber === 1
					? 'disabled material-icons'
					: 'material-icons'}
				onClick={onPrevClick}
			>
keyboard_arrow_left

   </i>
			{
				pages.map((number, index) => {
					return (
						<span
							className={index + 1 === pageNumber ? 'active' : ''}
							key={index}
							onClick={() => onPageNumberClick(number)}
						>
							{number}

						</span>
					)
				})
			}
			<i
				className={pageNumber === length
					? 'disabled material-icons'
					: 'material-icons'}
				onClick={onNextClick}
			>
				keyboard_arrow_right

   			
</i>
		</PaginationBox>

	)
}

export default Pagination;

Pagination.propTypes = {
	pageNumber: PropTypes.number.isRequired,
	pages: PropTypes.arrayOf(PropTypes.number),
	length: PropTypes.number.isRequired,
	onPrevClick: PropTypes.func.isRequired,
	onNextClick: PropTypes.func.isRequired,
	onPageNumberClick: PropTypes.func.isRequired,
}
Pagination.defaultProps = {
	pages: [],
}