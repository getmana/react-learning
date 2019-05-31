import React, { Component, Fragment, } from 'react';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { getBooksStart, } from '../store/models/books';
import { clearTableParams, sortItems, } from '../store/models/tableFunctional';
import history from '../store/routingHistory';
import styled from 'styled-components';
import { PageTitle, Spinner, Button, } from '../components';
import { TableFunctional, Input, } from '../modules';

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
			_limit: 15,
			columns: [ 'author', 'title', 'year', 'rating' ],
			title: '',
		};
	}

	componentDidMount() {
		const { _limit, } = this.state;
		this.props.clearTableParams();
		this.props.getBooksStart({ _limit, });
	}

	componentDidUpdate(prevProps, prevState) {
		const { _limit, title, } = this.state;
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
			this.props.getBooksStart({ _limit, });
		}
	}

	componentWillUnmount() {
		this.props.sortItems(false);
	}

	getBooks = (query) => {
		const { _limit, title, } = this.state;

		if (title) {
			history.push(`/search/${title}`);
			query = { q: title, ...query, };
		}
		this.props.getBooksStart({ ...query, _limit, });
	}

	handleClick = (id) => {
		this.props.clearTableParams();
		history.push(`/book/${id}`)
	}

	searchBookRequest = () => {
		const { _limit, title, } = this.state;
		this.props.clearTableParams();

		if (title.length >= 3) {
			history.push(`/search/${title}`)
			this.getBooks({ q: title, _limit, })
		}
	}

	handleChange = (e) => {
		e.persist();
		this.setState({
			title: e.target.value,
		})

		if (e.target.value.length >= 3) {
			this.delayedRequest();
		}
	}

	delayedRequest = debounce(this.searchBookRequest, 1000);

	addBook = () => {
		history.push('/book/add')
	}

	render() {
		const { processing, books, numberOfBooks, } = this.props;
		const { columns, title, _limit, } = this.state;
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
								<Button style="primary" onClick={this.addBook}>Add a New Book</Button>
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
										limit={_limit}
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
	sortItems: PropTypes.func.isRequired,
	match: PropTypes.shape({
		path: PropTypes.string,
		params: PropTypes.object,
		url: PropTypes.string,
	}),
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
	getBooksStart: (params) => dispatch(getBooksStart(params)),
	clearTableParams: () => dispatch(clearTableParams()),
	sortItems: (isSorted) => dispatch(sortItems(isSorted)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Books);