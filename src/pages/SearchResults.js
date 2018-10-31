import React, { Component, Fragment, } from 'react';
import { getBooksStart, } from '../store/models/books';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import history from '../store/routingHistory';
import styled from 'styled-components';
import { PageTitle, Table, Spinner, } from '../components';

const PageThemed = styled.div`
	padding: 20px;
	flex: 1 0 280px;
`;

export class SearchResults extends Component {
	componentDidMount() {
		const { params, } = this.props.match.params;
		this.props.getBooksStart(params);
	}

	handleClick = (id) => {
		history.push(`/book/${id}`)
	}

	render() {
		const { books, processing, numberOfBooks, } = this.props;
		const { params, } = this.props.match.params;
		const columns = [ 'author', 'title', 'year', 'rating' ];
		console.log('numberOfBooks', numberOfBooks)

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
							<Table
								tableColumns={columns}
								tableContent={books}
								caption="Search Results"
								onClick={this.handleClick}
							/>
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
	numberOfBooks: PropTypes.number,
}

const mapStateToProps = (state) => {
	return ({
		processing: state.books.processing,
		books: state.books.books,
		numberOfBooks: state.books.numberOfBooks,
	})
}

const mapDispatchToProps = (dispatch) => ({
	getBooksStart: (params) => {
		const queryString = `?q=${params}`;
		dispatch(getBooksStart(queryString))
	},
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SearchResults);