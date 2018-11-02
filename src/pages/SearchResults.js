import React, { Component, Fragment, } from 'react';
import { getBooksStart, } from '../store/models/books';
import { clearTableParams, } from '../store/models/tableFunctional';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import history from '../store/routingHistory';
import styled from 'styled-components';
import { PageTitle, Spinner, TableFunctional, Title, } from '../components';

const PageThemed = styled.div`
	padding: 20px;
	flex: 1 0 280px;
`;

export class SearchResults extends Component {
	state = {
		limit: 15,
		columns: [ 'author', 'title', 'year', 'rating' ],
	}

	componentDidMount() {
		const { limit, } = this.state;
		this.props.getBooksStart({ limit, });
	}

	componentWillUnmount() {
		this.props.clearTableParams();
	}

	getBooks = (query) => {
		const { limit, } = this.state;
		this.props.getBooksStart({ ...query, limit, });
	}

	handleClick = (id) => {
		history.push(`/book/${id}`)
	}

	render() {
		const { books, processing, numberOfBooks, } = this.props;
		const { params, } = this.props.match.params;
		const { limit, columns, } = this.state;

		return (
			<PageThemed>
				{
					processing ?
						<Spinner size="50px" />
						:
						<Fragment>
							<PageTitle>
								{`Search Results for '${params}'`}
							</PageTitle>
							{
								books.length === 0 &&
									<Title>Sorry, there are no books you are searching</Title>
							}
							{	books.length > 0 &&
								<TableFunctional
									tableColumns={columns}
									tableContent={books}
									caption="Search Results"
									limit={limit}
									numberOfItems={numberOfBooks}
									onClick={this.handleClick}
									onLoadItems={this.getBooks}
								/>
							}
						</Fragment>
				}
			</PageThemed>
		)
	}
}

SearchResults.propTypes = {
	getBooksStart: PropTypes.func.isRequired,
	processing: PropTypes.bool.isRequired,
	books: PropTypes.arrayOf(PropTypes.object).isRequired,
	match: PropTypes.shape({
		params: PropTypes.object.isRequired,
		path: PropTypes.string.isRequired,
	}).isRequired,
	numberOfBooks: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	clearTableParams: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	return ({
		processing: state.books.processing,
		books: state.books.books,
		numberOfBooks: state.books.numberOfBooks,
	})
}

const mapDispatchToProps = (dispatch, props) => ({
	getBooksStart: (queryParams) => {
		const { params, } = props.match.params
		let queryString = `?q=${params}&`;

		if (queryParams) {
			for (let key in queryParams) {
				queryString += `_${key}=${queryParams[key]}` + '&';
			}
		}

		dispatch(getBooksStart(queryString))
	},
	clearTableParams: () => dispatch(clearTableParams()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SearchResults);