import React, { Component, Fragment, } from 'react';
import { Field, reduxForm, reset, getFormMeta, destroy, } from 'redux-form';
import PropTypes from 'prop-types';
import { connect, formValueSelector, } from '../../decorators';
import { buyBooksStart, } from '../../store/models/books';
import { Button, CardFieldDuplicate, } from '../../components';
import { Input, } from '../../modules';
import {
	formatDate,
	formatCardNumber,
	parseCardNumber,
	formatCVC,
	parseCVC,
	parseDate,
	validate,
} from '../../helpers';
import img from '../../assets/images/credit-card.png'
import cardBack from '../../assets/images/credit-card-back.png'
import styled from 'styled-components';

const ButtonBox = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;

	button {
		max-width: 300px;
	}
`;

const CardContainer = styled.div`
	width: 300px;
	height: 185px;
	perspective: 1000;

	.cardNumberDuplicate {
		font-size: 26px;
		padding-top: 100px;
		text-align: center;
	}

	.cardNameDuplicate {
		font-size: 22px;
	}

	.cardDateDuplicate {
		font-size: 22px;
	}

	.cvcDuplicate {
		padding: 70px 0 0 185px;
	}

	.cardSides {
		background-repeat: no-repeat;
		background-size: 100%;
		width: 300px;
		height: 185px;
		backface-visibility: hidden;
		position: absolute;
 		top: 0;
		left: 0;
	}

	.flipper.backSide {
		transform: rotateY(180deg);
	}
`;

const Flipper = styled.div`
	transition: 0.6s;
	transform-style: preserve-3d;
	position: relative;
`;

const Front = styled.div`
	background-image: url(${img});
	z-index: 2;
`;

const Back = styled.div`
	background-image: url(${cardBack});
	transform: rotateY(180deg);
`;

const NameAndDateContainer = styled.div`
	display: flex;
	padding: 15px 20px 0 20px;
	justify-content: space-between;
`;

export class BuyBooksSecondPage extends Component {
	parseCardNumber = (cardNumber) => {
		const stars = cardNumber.padEnd(16, '*');

		return stars.slice(0, 4) + ' ' + stars.slice(4, 8) + ' ' + stars.slice(8, 12) + ' ' + stars.slice(12, 16);
	}

	parseCardDate = (cardDate) => {
		const day = cardDate.slice(0, 2).padEnd(2, '*');
		const month = cardDate.slice(3, 5).padEnd(2, '*');

		return day + '/' + month;
	}

	render() {
		const {
			handleSubmit,
			onPrevStep,
			cardNumberValue,
			cardNameValue,
			cardDateValue,
			cvcValue,
			formMeta,
		} = this.props;
		const { cardNumber, cardName, cardDate, cvc, } = formMeta || {};

		return (
			<Fragment>
				<form onSubmit={handleSubmit}>
					<Field
						name="cardNumber"
						component={Input}
						type="text"
						label="Card Number"
						format={formatCardNumber}
						parse={parseCardNumber}
					/>
					<Field
						name="cardName"
						component={Input}
						type="text"
						label="Card Name:"
					/>
					<Field
						name="cardDate"
						component={Input}
						type="text"
						placeholder="01/01"
						label="Card Date:"
						format={formatDate}
						parse={parseDate}
					/>
					<Field
						name="cvc"
						component={Input}
						type="text"
						label="CVC:"
						format={formatCVC}
						parse={parseCVC}
					/>
					<ButtonBox>
						<Button style="primary" onClick={onPrevStep}>Previous Step</Button>
						<Button style="primary" type="submit">Buy Books</Button>
					</ButtonBox>
				</form>
				<CardContainer>
					<Flipper className={cvc && cvc.active ? 'flipper backSide' : 'flipper'}>
						<Front className="cardSides">
							<CardFieldDuplicate
								className="cardNumberDuplicate"
								active={cardNumber ? cardNumber.active : false}
								value={cardNumberValue ? this.parseCardNumber(cardNumberValue) : '**** **** **** ****'}
							/>
							<NameAndDateContainer>
								<CardFieldDuplicate
									className="cardNameDuplicate"
									active={cardName ? cardName.active : false}
									value={cardNameValue ? cardNameValue : 'Your name here'}
								/>
								<CardFieldDuplicate
									className="cardDateDuplicate"
									active={cardDate ? cardDate.active : false}
									value={cardDateValue ? this.parseCardDate(cardDateValue) : '**/**'}
								/>
							</NameAndDateContainer>
						</Front>
						<Back className="cardSides">
							<CardFieldDuplicate
								className="cvcDuplicate"
								value={cvcValue ? cvcValue : ''}
							/>
						</Back>
					</Flipper>
				</CardContainer>
			</Fragment>
		)
	}
}

BuyBooksSecondPage.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	onPrevStep: PropTypes.func.isRequired,
	cardNumberValue: PropTypes.string,
	cardNameValue: PropTypes.string,
	cardDateValue: PropTypes.string,
	cvcValue: PropTypes.string,
	formMeta: PropTypes.objectOf(PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
	])),
}

BuyBooksSecondPage.defaultProps = {
	formMeta: {},
}

const SecondPageContainer = reduxForm({
	form: 'buyBooksForm',
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
	validate,
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
				number: +values.cardNumber,
				name: values.cardName,
				date: values.cardDate,
				cvc: +values.cvc,
			},
			books: booksId,
		}

		dispatch(buyBooksStart(responseData));
		dispatch(reset('buyBooksForm'));
		dispatch(destroy('buyBooksForm'));
	},
})(BuyBooksSecondPage);

const selector = formValueSelector('buyBooksForm');

const mapStateToProps = (state) => {
	const cardNumberValue = selector(state, 'cardNumber');
	const cardNameValue = selector(state, 'cardName');
	const cardDateValue = selector(state, 'cardDate');
	const cvcValue = selector(state, 'cvc');
	const metaSelector = getFormMeta('buyBooksForm');

	return ({
		cardNumberValue,
		cardNameValue,
		cardDateValue,
		cvcValue,
		formMeta: metaSelector(state),
	})
}

export default connect(
	mapStateToProps,
	{ buyBooksStart, },
)(SecondPageContainer);