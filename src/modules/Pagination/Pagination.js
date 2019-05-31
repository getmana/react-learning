import React, { Component, } from 'react';
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

export default class Pagination extends Component {
	handlePrevClick = () => {
		const { pageNumber, onSelectPage, } = this.props;

		if (pageNumber > 1) {
			onSelectPage(pageNumber - 1);
		}
	}

	handleNextClick = () => {
		const { pageNumber, onSelectPage, length, } = this.props;

		if (pageNumber < length) {
			onSelectPage(pageNumber + 1);
		}
	}

	render() {
		const { pageNumber, pages, length, onSelectPage, } = this.props;

		return (
			<PaginationBox>
				<i
					className={pageNumber === 1
						? 'disabled material-icons'
						: 'material-icons'}
					onClick={this.handlePrevClick}
				>
	keyboard_arrow_left

    				</i>
				{
					pages.map((number, index) => {
						return (
							<span
								className={index + 1 === pageNumber ? 'active' : ''}
								key={index}
								onClick={() => onSelectPage(number)}
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
					onClick={this.handleNextClick}
				>
					keyboard_arrow_right

    				</i>
			</PaginationBox>

		)
	}
}

Pagination.propTypes = {
	pageNumber: PropTypes.number.isRequired,
	pages: PropTypes.arrayOf(PropTypes.number),
	length: PropTypes.number.isRequired,
	onSelectPage: PropTypes.func.isRequired,
}
Pagination.defaultProps = {
	pages: [],
}