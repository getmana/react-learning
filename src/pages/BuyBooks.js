import React, { Component, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { getBooksStart, } from '../store/models/books';
import { PageTitle, BuyBooksFirstPage, BuyBooksSecondPage, } from '../components';

const PageThemed = styled.div`
	padding: 20px;
	flex: 1 0 280px;
`;

export class BuyBooks extends Component {
	state = {
		page: 1,
		list: [],
	}

	componentDidMount() {
		this.props.getBooksStart();
	}

	componentDidUpdate(prevProps) {
		const { books, } = this.props;

		if (books !== prevProps.books && books.length > 0) {
			this.formTitlesList(books);
		}
	}

	formTitlesList = (books) => {
		let list = books.map((book) => {
			return book.title;
		});
		this.setState({
			list,
		})
	}

	nextPage = () => {
		this.setState({
			page: 2,
		})
	}

	goToPrevStep = () => {
		this.setState({
			page: 1,
		})
	}

	render() {
		const { page, list, } = this.state;
		//const { handleSubmit, } = this.props;
		const { books, } = this.props;

		return (
			<PageThemed>
				<PageTitle>Buy Books Page</PageTitle>
				{
					page === 1 && list.length > 0 &&
						<BuyBooksFirstPage list={list} onSubmit={this.nextPage} />
				}
				{
					page === 2 &&
						<BuyBooksSecondPage allBooksList={books} onPrevStep={this.goToPrevStep} />
				}
			</PageThemed>
		)
	}
}

BuyBooks.propTypes = {
	onSubmit: PropTypes.func,
	books: PropTypes.arrayOf(PropTypes.object),
	getBooksStart: PropTypes.func.isRequired,
}

BuyBooks.defaultProps = {
	books: [],
}

const mapStateToProps = (state) => {
	return ({
		books: state.books.books,
	})
}

const mapDispatchToProps = (dispatch) => ({
	getBooksStart: (params) => dispatch(getBooksStart(params)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BuyBooks);

// onSubmit={handleSubmit}