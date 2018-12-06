import React, { Component, } from 'react';
import styled from 'styled-components';
import { Field, reduxForm, FieldArray, } from 'redux-form';
import { connect, formValueSelector, } from '../decorators';
import { Dropdown, Button, Form, Input, } from '../components';
import { isOneOf, required, } from '../helpers';

const FormBox = styled.div`
	padding: 20px;
	max-width: 300px;
`;

const LiThemed = styled.li`
	display: flex;
	justify-content: space-between;
`;

const renderBooks = ({ fields, meta: { error, submitFailed, }, bookTitle, list, onChange, }) => (
	<ul>
		<li>
			<Button
				style="primary"
				disabled={list.length === 0 || !bookTitle}
				onClick={() => {
					fields.push(bookTitle);
					onChange('bookTitle', '')
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
					onClick={() => fields.remove(index)}
				>
					<i className="material-icons">delete</i>
				</Button>
			</LiThemed>
		))}
	</ul>
)

export class BuyBooksFirstPage extends Component {
	state = {
		resultList: [],
		filteredList: this.props.list,
	}

	componentDidMount() {
		this.filterList();
	}

	componentDidUpdate(prevProps) {
		const { bookTitle, addedBooks, } = this.props;
		const { filteredList, } = this.state;

		if (addedBooks !== prevProps.addedBooks && Array.isArray(addedBooks)) {
			let resultList = [];
			addedBooks.forEach((book) => {
				resultList = filteredList.filter((item) => {
					return item !== book;
				})
			})
			this.setState({
				filteredList: resultList,
			})
		}

		if (bookTitle !== prevProps.bookTitle) {
			this.filterList(bookTitle);
		}
	}

	filterList = (bookTitle) => {
		const { addedBooks, } = this.props;
		const { filteredList, } = this.state;
		console.log('addedBooks', addedBooks)
		let result = filteredList;

		if (bookTitle) {
			let filter = bookTitle.toLowerCase();
			result = filteredList.filter((item) => {
				return item.toLowerCase().indexOf(filter) === 0;
			})
		}

		this.setState({
			resultList: result.slice(0, 7),
		})
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
						label="Select Book:"
						list={resultList}
						defaultProp={bookTitle}
						onSelect={this.selectVariant}
					/>
					<FieldArray name="books" bookTitle={bookTitle} list={resultList} component={renderBooks} onChange={this.props.change} />
					<Button style="primary" disabled={!Array.isArray(addedBooks)} type="submit">Next</Button>
				</Form>
			</FormBox>
		)
	}
}

const FirstPageContainer = reduxForm({
	form: 'buyBooksForm',
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
})(BuyBooksFirstPage);

const selector = formValueSelector('buyBooksForm')

const mapStateToProps = (state) => {
	const bookTitle = selector(state, 'bookTitle');
	const addedBooks = selector(state, 'books');

	return ({
		bookTitle,
		addedBooks,
	})
}

export default connect(
	mapStateToProps,
)(FirstPageContainer);