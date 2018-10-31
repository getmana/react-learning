import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table, Pagination, } from './components';

class TableFunctional extends Component {
	state = {
		pageNumber: 1,
		isSorted: false,
	}

	formPageNumbers = () => {
		const { limit, numberOfItems, } = this.props;
		let pages = [];

		for (let i = 1; i <= Math.ceil(numberOfItems / limit); i++) {
			pages.push(i);
		}

		return pages;
	}

	render() {
		const {
			columns,
			tableContent,
			caption,
			onClick,
			limit,
			numberOfItems,
		} = this.props;
		const { pageNumber, } = this.state;

		return (
			<Fragment>
				<Table
					tableColumns={columns}
					tableContent={tableContent}
					caption={caption}
					onClick={onClick}
				/>
				{
					numberOfItems > limit &&
						<Pagination
							pageNumber={pageNumber}
							pages={this.formPageNumbers}
							length={Math.ceil(numberOfItems / limit)}
							onPrevClick={this.gotoPrevPage}
							onNextClick={this.gotoNextPage}
							onPageNumberClick={this.selectPage}
						/>
				}
			</Fragment>

		)
	}
}

export default TableFunctional;

TableFunctional.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.string).isRequired,
	tableContent: PropTypes.arrayOf(PropTypes.object).isRequired,
	caption: PropTypes.string,
	onClick: PropTypes.func,
	limit: PropTypes.number.isRequired,
	numberOfItems: PropTypes.number.isRequired,
}