import React, { Component, Fragment, } from 'react';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getBooksStart, } from '../store/models/books';
import history from '../store/routingHistory';
import styled from 'styled-components';
import { PageTitle, Spinner, Table, Input, Button, Pagination, } from '../components';

const PageThemed = styled.div`
	padding: 20px;
	flex: 1 0 280px;
`;

const InputBox = styled.div`
	max-width: 300px;
`;

export class Books extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageNumber: 1,
			limit: 15,
			pages: [],
			columns: [ 'author', 'title', 'year', 'rating' ],
			title: '',
			isSorted: false,
		};
		this.delayedRequest = _.debounce(this.searchBookRequest, 1000);
	}

	componentDidMount() {
		const { limit, pageNumber, } = this.state;
		this.countNumberOfPages(100);
		this.props.getBooksStart({ page: pageNumber, limit, });
	}

	countNumberOfPages = (numberOfBooks) => {
		const { limit, } = this.state;
		let pages = [];

		for (let i = 1; i <= Math.ceil(numberOfBooks / limit); i++) {
			pages.push(i);
		}
		this.setState({
			pages,
		})
	}

	selectPage = (pageNumber) => {
		const { limit, isSorted, } = this.state;
		let query = {};

		if (isSorted) {
			query = { sort: 'title', }
		}
		this.setState({
			pageNumber,
		})
		this.props.getBooksStart({ ...query, page: pageNumber, limit, });
	}

	gotoPrevPage = () => {
		const { pageNumber, limit, isSorted, } = this.state;
		let query = {};

		if (isSorted) {
			query = { sort: 'title', }
		}

		if (pageNumber >= 2) {
			this.setState(prevState => ({
				pageNumber: prevState.pageNumber - 1,
			}))
			this.props.getBooksStart({ ...query, page: pageNumber - 1, limit, });
		}
	}

	gotoNextPage = () => {
		const { pageNumber, pages, limit, isSorted, } = this.state;
		let query = {};

		if (isSorted) {
			query = { sort: 'title', }
		}

		if (pageNumber <= pages.length - 1) {
			this.setState(prevState => ({
				pageNumber: prevState.pageNumber + 1,
			}))
			this.props.getBooksStart({ ...query, page: pageNumber + 1, limit, });
		}
	}

	handleClick = (id) => {
		history.push(`/book/${id}`)
	}

	searchBookRequest = (e) => {
		const search = e.target.value;
		history.push(`/search/${search}`)
	}

	handleChange = (e) => {
		e.persist();
		this.setState({
			title: e.target.value,
		})

		if (e.target.value.length >= 3) {
			this.delayedRequest(e);
		}
	}

	sortBooks = () => {
		const { limit, } = this.state;
		this.setState({
			isSorted: true,
			pageNumber: 1,
		})
		this.props.getBooksStart({ sort: 'title', limit, });
	}

	render() {
		const { processing, books, } = this.props;
		const { pages, columns, pageNumber, title, isSorted, } = this.state;
		const length = pages.length;

		return (
			<PageThemed>
				{
					processing ?
						<Spinner size="50px" />
						: <Fragment>
							<PageTitle>Books</PageTitle>
							<InputBox>
								<Input
									type="text"
									label="Search the book by the title:"
									icon="search"
									currentValue={title}
									onChange={this.handleChange}
								/>
								<Button style="primary" loading={processing} disabled={isSorted} onClick={this.sortBooks}>Sort Books by the Title</Button>
							</InputBox>
							<Table
								tableColumns={columns}
								tableContent={books}
								caption="Available Books"
								onClick={this.handleClick}
							/>
							<Pagination
								pageNumber={pageNumber}
								pages={pages}
								length={length}
								onPrevClick={this.gotoPrevPage}
								onNextClick={this.gotoNextPage}
								onPageNumberClick={this.selectPage}
							/>
						  </Fragment>
				}
			</PageThemed>
		)
	}
}

Books.propTypes = {
	getBooksStart: PropTypes.func.isRequired,
	processing: PropTypes.bool.isRequired,
	books: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = (state) => {
	return ({
		processing: state.books.processing,
		books: state.books.books,
		prevQueryString: state.books.queryString,
	})
}

const mapDispatchToProps = (dispatch) => ({
	getBooksStart: (params) => {
		let queryString = '?';

		if (params) {
			for (let key in params) {
				if (key === 'q') {
					queryString += `${key}=${params[key]}` + '&'
				}
				else {
					queryString += `_${key}=${params[key]}` + '&';
				}
			}
		}
		else {
			queryString = ''
		}
		dispatch(getBooksStart(queryString))
	},
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Books);