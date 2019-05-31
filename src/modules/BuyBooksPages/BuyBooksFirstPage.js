import React, { Component, } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getBooksStart, } from '../../store/models/books';
import { Field, reduxForm, FieldArray, } from 'redux-form';
import { connect, formValueSelector, } from '../../decorators';
import { Button, Form, } from '../../components';
import { Input, Dropdown, } from '../../modules';

const FormBox = styled.div`
	padding: 20px;
	max-width: 300px;
`;

const LiThemed = styled.li`
	display: flex;
	justify-content: space-between;
`;

const renderBooks = ({ fields, meta: { error, submitFailed, }, bookTitle, onChange, resultList, updateList, }) => (
	<ul>
		<li>
			<Button
				style="primary"
				disabled={!bookTitle || resultList.indexOf(bookTitle) === -1}
				onClick={() => {
					fields.push(bookTitle);
					onChange('bookTitle', '');
					updateList();
				}}
			>
				Add Book

   			</Button>
			{submitFailed && error && <span>{error}</span>}
		</li>
		{fields.map((book, index) => (
			<LiThemed key={index}>
				<Field
					readOnly
					name={book}
					label={`Book #${index + 1}`}
					type="text"
					component={Input}
				/>
				<Button
					iconButton
					style="primary"
					onClick={() => {
						fields.remove(index);
						updateList();
					}}
				>
					<i className="material-icons">delete</i>
				</Button>
			</LiThemed>
		))}
	</ul>
)

renderBooks.propTypes = {
	bookTitle: PropTypes.string,
	onChange: PropTypes.func,
	fields: PropTypes.object,
	meta: PropTypes.shape({
		error: PropTypes.string,
		submitFailed: PropTypes.bool,
	}),
	resultList: PropTypes.arrayOf(PropTypes.string),
	updateList: PropTypes.func,
}

const selector = formValueSelector('buyBooksForm')

const mapStateToProps = (state) => {
	const bookTitle = selector(state, 'bookTitle');
	const addedBooks = selector(state, 'books');

	return ({
		bookTitle,
		addedBooks,
		books: state.books.books,
	})
}

const mapDispatchToProps = (dispatch) => ({
	getBooksStart: (params) => dispatch(getBooksStart(params)),
})

@connect(
	mapStateToProps,
	mapDispatchToProps,
)

@reduxForm({
	form: 'buyBooksForm',
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
})

export default class BuyBooksFirstPage extends Component {
	state = {
		resultList: [],
	}

	componentDidMount() {
		this.formInitList();
	}

	componentDidUpdate(prevProps) {
		const { books, addedBooks, } = this.props;

		if (books !== prevProps.books && Array.isArray(books)) {
			let resultList = [], filteredList = [];
			books.forEach((book) => {
				resultList.push(book.title)
			})

			if (addedBooks && addedBooks.length > 0) {
				filteredList = resultList.filter((book) => {
					return addedBooks.indexOf(book) === -1
				})
			}

			const list = addedBooks ? filteredList : resultList;

			this.setState({
				resultList: list.slice(0, 7),
			})
		}
	}

	formInitList = () => {
		const { books, } = this.props;

		if (books && books.length > 0) {
			let resultList = books.map((book) => {
				return book.title;
			}).slice(0, 7);
			this.setState({
				resultList,
			})
		}
	}

	handleChange = (e) => {
		if (e.target.value.length >= 3) {
			this.searchBooks(e.target.value);
		}
		else if (e.target.value.length === 0) {
			this.props.getBooksStart();
		}
	}

	searchBooks = (title) => {
		this.props.getBooksStart({ q: title, _limit: 7, });
	}

	selectVariant = (param, fieldName) => {
		this.props.change(fieldName, param)
	}

	render() {
		const { handleSubmit, bookTitle, addedBooks, } = this.props;
		const { resultList, } = this.state;

		return (
			<FormBox>
				<Form onSubmit={handleSubmit}>
					<Field
						name="bookTitle"
						component={Dropdown}
						type="text"
						label="Search the Book:"
						list={resultList}
						defaultProp={bookTitle}
						onSelect={this.selectVariant}
						onChange={this.handleChange}
					/>
					<FieldArray
						name="books"
						bookTitle={bookTitle}
						component={renderBooks}
						resultList={resultList}
						updateList={this.props.getBooksStart}
						onChange={this.props.change}
						onDelete={this.deleteFromAdded}
					/>
					<Button style="primary" disabled={!Array.isArray(addedBooks)} type="submit">Next</Button>
				</Form>
			</FormBox>
		)
	}
}

BuyBooksFirstPage.propTypes = {
	handleSubmit: PropTypes.func,
	change: PropTypes.func,
	addedBooks: PropTypes.arrayOf(PropTypes.string),
	bookTitle: PropTypes.string,
	getBooksStart: PropTypes.func,
	initList: PropTypes.arrayOf(PropTypes.string),
	books: PropTypes.arrayOf(PropTypes.object),
}