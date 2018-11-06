import React, { Component, Fragment, } from 'react';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getBooksStart, } from '../store/models/books';
import { clearTableParams, } from '../store/models/tableFunctional';
import history from '../store/routingHistory';
import styled from 'styled-components';
import { PageTitle, Spinner, Input, TableFunctional, } from '../components';

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
			limit: 15,
			columns: [ 'author', 'title', 'year', 'rating' ],
			title: '',
		};
		this.delayedRequest = _.debounce(this.searchBookRequest, 1000);
	}

	componentDidMount() {
		const { limit, } = this.state;
		history.push('/books');
		this.props.getBooksStart({ limit, });
	}

	componentDidUpdate(prevProps, prevState) {
		const { limit, title, } = this.state;
		const path = this.props.match.path;

		if (
			prevProps.match.path !== path && path === '/books' ||
			prevState.title !== title && title === ''
		) {
			this.setState({
				title: '',
			})
			history.push('/books');
			this.props.clearTableParams();
			this.props.getBooksStart({ limit, });
		}
	}

	getBooks = (query) => {
		const { limit, title, } = this.state;

		if (title) {
			history.push(`/search/${title}`);
			query = { q: title, ...query, };
		}
		this.props.getBooksStart({ ...query, limit, });
	}

	handleClick = (id) => {
		history.push(`/book/${id}`)
	}

	searchBookRequest = (e) => {
		const { limit, } = this.state;
		this.props.clearTableParams();
		const search = e.target.value;
		history.push(`/search/${search}`)
		this.getBooks({ q: search, limit, })
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

	render() {
		const { processing, books, numberOfBooks, } = this.props;
		const { columns, title, limit, } = this.state;
		const { params, } = this.props.match.params || {};
		const { url, } = this.props.match;
		const isSearchResults = url.indexOf('search');

		return (
			<PageThemed>
				{
					processing ?
						<Spinner size="50px" />
						: <Fragment>
							<Fragment>
								{
									isSearchResults >= 0
										? <PageTitle>{`Search Results for '${params}'`}</PageTitle>
										: <PageTitle>Books</PageTitle>
								}

							</Fragment>
							<InputBox>
								<Input
									type="text"
									label="Search the book by the title:"
									icon="search"
									currentValue={title}
									onChange={this.handleChange}
								/>
							</InputBox>
							{
								books.length > 0 &&
									<TableFunctional
										tableColumns={columns}
										tableContent={books}
										caption={isSearchResults >= 0 ? 'Search Results' : 'Available Books'}
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

Books.propTypes = {
	getBooksStart: PropTypes.func.isRequired,
	processing: PropTypes.bool.isRequired,
	books: PropTypes.arrayOf(PropTypes.object).isRequired,
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
		prevQueryString: state.books.queryString,
		numberOfBooks: state.books.numberOfBooks,
	})
}

const mapDispatchToProps = (dispatch) => ({
	getBooksStart: (params) => {
		let queryString = '?';

		if (params) {
			for (let key in params) {
				if (key === 'q') {
					queryString = `?q=${params[key]}&`
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
	clearTableParams: () => dispatch(clearTableParams()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Books);