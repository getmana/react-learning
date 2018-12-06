import React, { Component, } from 'react';
import { Field, reduxForm, } from 'redux-form';
import { connect, formValueSelector, } from '../decorators';
import { buyBooksStart, } from '../store/models/books';
import { Input, Button, } from '../components';
import { required, sixteenDigits, onlyInteger, threeDigits, englishLetters, moreThanThreeLetters, formatDate, validDate, } from '../helpers';
import styled from 'styled-components';

const ButtonBox = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;

	button {
		max-width: 300px;
	}
`;

export class BuyBooksSecondPage extends Component {
	render() {
		const {
			//onSubmit,
			handleSubmit,
			onPrevStep,
			cardNumber,
			cardName,
			cardDate,
			cvc,
		} = this.props;

		return (
			<form onSubmit={handleSubmit}>
				<Field
					name="cardNumber"
					component={Input}
					type="text"
					label="Card Number"
					validate={[ required, onlyInteger, sixteenDigits ]}
				/>
				<Field
					name="cardName"
					component={Input}
					type="text"
					label="Card Name:"
					validate={[ required, englishLetters, moreThanThreeLetters ]}
				/>
				<Field
					name="cardDate"
					component={Input}
					type="text"
					placeholder="01/01"
					label="Card Date:"
					validate={[ required, validDate ]}
					format={formatDate}
				/>
				<Field
					name="cvc"
					component={Input}
					type="text"
					label="CVC:"
					validate={[ required, onlyInteger, threeDigits ]}
				/>
				<ButtonBox>
					<Button style="primary" onClick={onPrevStep}>Previous Step</Button>
					<Button style="primary" type="submit">Buy Books</Button>
				</ButtonBox>
			</form>
		)
	}
}

const SecondPageContainer = reduxForm({
	form: 'buyBooksForm',
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
	onSubmit: (values, dispatch, props ) => {
		const allBooksList = props.allBooksList;
		const booksId = values.books.map((title) => {
			const book = allBooksList.filter((currentBook) => {
				return currentBook.title === title
			})

			return book[0].id;
		})
		const responseData = {
			card: {
				number: values.cardNumber,
				name: values.cardName,
				date: values.cardDate,
				cvc: values.cvc,
			},
			books: booksId,
		}

		dispatch(buyBooksStart(responseData));
	},
})(BuyBooksSecondPage);

const selector = formValueSelector('buyBooksForm')

const mapStateToProps = (state) => {
	const cardNumber = selector(state, 'cardNumber');
	const cardName = selector(state, 'cardName');
	const cardDate = selector(state, 'cardDate');
	const cvc = selector(state, 'cvc');

	return ({
		cardNumber,
		cardName,
		cardDate,
		cvc,
	})
}

export default connect(
	mapStateToProps,
	{ buyBooksStart, },
)(SecondPageContainer);