import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect, } from 'react-redux';
import { changePageNumber, sortItems, savePages, } from '../store/models/tableFunctional';
import Table from './Table';
import Pagination from './Pagination';
import Button from './Button';

const ButtonBox = styled.div`
    max-width: 300px;
`;

export class TableFunctional extends Component {
	componentDidMount() {
		const { numberOfPages, } = this.props;

		if (numberOfPages === 0) {
			this.formPageNumbers();
		}
	}

	formPageNumbers = () => {
		const { numberOfItems, limit, } = this.props;
		const numberOfPages = Math.ceil(numberOfItems / limit);
		let pages = [];

		for (let i = 1; i <= numberOfPages; i++) {
			pages.push(i);
		}
		this.props.savePages(pages)
	}

	sortItems = () => {
		this.props.sortItems(true);
		this.props.onLoadItems({ _sort: 'title', });
	}

	selectPage = (pageNumber) => {
		const { onLoadItems, isSorted, changePageNumber, } = this.props;
		let query = {};

		if (isSorted) {
			query = { _sort: 'title', }
		}
		changePageNumber(pageNumber);
		onLoadItems({ ...query, _page: pageNumber, });
	}

	render() {
		const {
			tableColumns,
			tableContent,
			caption,
			onClick,
			pageNumber,
			pages,
			numberOfPages,
			isSorted,
		} = this.props;

		return (
			<Fragment>
				<ButtonBox>
					<Button style="primary" disabled={isSorted} onClick={this.sortItems}>Sort Books by the Title</Button>
				</ButtonBox>
				<Table
					tableColumns={tableColumns}
					tableContent={tableContent}
					caption={caption}
					onClick={onClick}
				/>
				{
					numberOfPages > 1 &&
						<Pagination
							pageNumber={pageNumber}
							pages={pages}
							length={numberOfPages}
							onSelectPage={this.selectPage}
						/>
				}

			</Fragment>
		)
	}
}

TableFunctional.propTypes = {
	tableColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
	tableContent: PropTypes.arrayOf(PropTypes.object).isRequired,
	caption: PropTypes.string,
	onClick: PropTypes.func,
	limit: PropTypes.number.isRequired,
	numberOfItems: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	onLoadItems: PropTypes.func,
	pageNumber: PropTypes.number,
	numberOfPages: PropTypes.number.isRequired,
	isSorted: PropTypes.bool.isRequired,
	savePages: PropTypes.func.isRequired,
	sortItems: PropTypes.func.isRequired,
	changePageNumber: PropTypes.func.isRequired,
	pages: PropTypes.arrayOf(PropTypes.number).isRequired,
}

const mapStateToProps = (state) => {
	return ({
		pageNumber: state.tableFunctional.pageNumber,
		isSorted: state.tableFunctional.isSorted,
		pages: state.tableFunctional.pages,
		numberOfPages: state.tableFunctional.numberOfPages,
	})
}

const mapDispatchToProps = (dispatch) => ({
	changePageNumber: (pageNumber) => dispatch(changePageNumber(pageNumber)),
	sortItems: (isSorted) => dispatch(sortItems(isSorted)),
	savePages: (pages) => dispatch(savePages(pages)),

})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TableFunctional);