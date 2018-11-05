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

	render() {
		const { processing, books, numberOfBooks, } = this.props;
		const { columns, title, limit, } = this.state;

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
							</InputBox>
							{
								books.length > 0 &&
									<TableFunctional
										tableColumns={columns}
										tableContent={books}
										caption="Available Books"
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
				queryString += `_${key}=${params[key]}` + '&';
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