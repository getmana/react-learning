import React, { Component, } from 'react';
import { reduxForm, connect, } from '../decorators';
import PropTypes from 'prop-types';
import {
	getCurrentBookStart,
	getLanguagesStart,
	getRatingsStart,
	editBookStart,
	setEditingMode,
	deleteBookStart,
	addBookStart,
	clearCurrentBook,
} from '../store/models/books';
import { clearTableParams, } from '../store/models/tableFunctional';
import styled from 'styled-components';
import { englishLetters, imageLinks, positiveNumbers, lessThenCurrent, wikiFormat, isOneOf, onlyInteger, required, } from '../helpers';
import { PageTitle, Spinner, Button, Form, Field, Portal, } from '../components';
import { CenteredModal, DeleteBookModal, Input, Dropdown, } from '../modules';

const PageThemed = styled.div`
	padding: 20px;
	flex: 1 0 280px;
`;

const FormBox = styled.div`
`;

const ButtonBox = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;

	button {
		max-width: 300px;
	}
`;

const portalInitStyle = {
	position: 'fixed',
	zIndex: '10',
	fontFamily: 'Roboto, sans-serif',
	width: '40%',
	height: '40vh',
	top: '30vh',
	left: '30%',
};

export class SingleBook extends Component {
	state = {
		modalIsOpen: false,
	}

	componentDidMount() {
		this.props.clearCurrentBook();
		const { id, } = this.props.match.params;
		this.props.getLanguagesStart();
		this.props.getRatingsStart();

		if (id === 'add') {
			this.props.setEditingMode(true)
		}
		else {
			this.props.getCurrentBookStart(id);
		}
	}

	componentWillUnmount() {
		this.props.setEditingMode(false);
	}

	selectVariant = (param, fieldName) => {
		console.log('fieldName', fieldName)
		this.props.change(fieldName, param)
	}

	handleClickEdit = () => {
		this.props.setEditingMode(true);
	}

	handleClickCancel = () => {
		this.props.reset('singleBookForm');
		this.props.setEditingMode(false);
	}

	handleClickDelete = () => {
		this.setState({
			modalIsOpen: true,
		})
	}

	deleteBook = () => {
		const { id, } = this.props.match.params;
		this.props.deleteBookStart(id);
		this.setState({
			modalIsOpen: false,
		})
	}

	closeModal = () => {
		this.setState({
			modalIsOpen: false,
		})
	}

	render() {
		const {
			processing,
			handleSubmit,
			languages,
			language,
			ratings,
			rating,
			processingLanguages,
			processingRatings,
			editingMode,
			title,
		} = this.props;
		const { modalIsOpen, } = this.state;

		return (
			<PageThemed>
				<PageTitle>Book Details</PageTitle>
				{
					processing || processingLanguages || processingRatings ?
						<Spinner size="50px" />
						:
						<FormBox>
							<Form onSubmit={handleSubmit}>
								<Field
									name="title"
									component={Input}
									type="text"
									label="Book Title:"
									validate={required}
									readOnly={!editingMode}
								/>
								<Field
									name="author"
									component={Input}
									type="text"
									label="Book Author:"
									validate={[ englishLetters, required ]}
									readOnly={!editingMode}
								/>
								<Field
									name="country"
									component={Input}
									type="text"
									label="Country:"
									validate={[ englishLetters, required ]}
									readOnly={!editingMode}
								/>
								<Field
									name="year"
									component={Input}
									type="number"
									label="Year:"
									validate={[ lessThenCurrent, positiveNumbers, onlyInteger, required ]}
									readOnly={!editingMode}
								/>
								<Field
									name="language"
									component={Dropdown}
									type="text"
									label="Book Language:"
									list={languages}
									defaultProp={language}
									validate={required}
									readOnly={!editingMode}
									className={!editingMode ? 'readonly-dropdown' : ''}
									normalize={isOneOf(languages)}
									onSelect={this.selectVariant}
								/>
								<Field
									name="rating"
									component={Dropdown}
									type="text"
									label="Rating:"
									list={ratings}
									defaultProp={rating}
									validate={required}
									readOnly={!editingMode}
									className={!editingMode ? 'readonly-dropdown' : ''}
									normalize={isOneOf(ratings)}
									onSelect={this.selectVariant}
								/>
								<Field
									name="link"
									component={Input}
									type="text"
									label="Book Link:"
									validate={wikiFormat}
									readOnly={!editingMode}
								/>
								<Field
									name="pages"
									component={Input}
									type="number"
									label="Number of Pages:"
									readOnly={!editingMode}
									validate={[ positiveNumbers, onlyInteger, required ]}
								/>
								<Field
									name="imageLink"
									component={Input}
									type="text"
									label="Image Link:"
									validate={[ imageLinks, required ]}
									readOnly={!editingMode}
								/>
								{
									editingMode &&
										<ButtonBox>
											<Button style="primary" type="submit">Save</Button>
											<Button style="primary" onClick={this.handleClickCancel}>Cancel</Button>
										</ButtonBox>
								}
								{
									!editingMode &&
									<ButtonBox>
										<Button style="primary" onClick={this.handleClickEdit}>Edit Book Info</Button>
										<Button style="primary" onClick={this.handleClickDelete}>Delete Book</Button>
									</ButtonBox>
								}
							</Form>
						</FormBox>
				}
				{modalIsOpen && (
					<Portal portalStyle={portalInitStyle} onClose={this.closeModal}>
						<CenteredModal title="Delete Book">
							<DeleteBookModal
								bookTitle={title}
								onDelete={this.deleteBook}
								onClose={this.closeModal}
							/>
						</CenteredModal>
					</Portal>
				)}
			</PageThemed>
		)
	}
}

SingleBook.propTypes = {
	books: PropTypes.arrayOf(PropTypes.object),
	getCurrentBookStart: PropTypes.func.isRequired,
	getLanguagesStart: PropTypes.func.isRequired,
	getRatingsStart: PropTypes.func.isRequired,
	processing: PropTypes.bool.isRequired,
	processingLanguages: PropTypes.bool.isRequired,
	processingRatings: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.object,
		id: PropTypes.string,
	}),
	handleSubmit: PropTypes.func.isRequired,
	languages: PropTypes.arrayOf(PropTypes.string),
	language: PropTypes.string,
	ratings: PropTypes.arrayOf(PropTypes.number),
	rating: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	change: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired,
	theme: PropTypes.objectOf(PropTypes.string),
	editingMode: PropTypes.bool.isRequired,
	setEditingMode: PropTypes.func.isRequired,
	title: PropTypes.string,
	deleteBookStart: PropTypes.func.isRequired,
	clearTableParams: PropTypes.func.isRequired,
	clearCurrentBook: PropTypes.func.isRequired,
}

SingleBook.defaultProp = {
	languages: [],
	language: '',
	ratings: [],
	rating: '',
	title: '',
}

const SingleBookContainer = reduxForm({
	form: 'singleBookForm',
	enableReinitialize: true,
	onSubmit: (values, dispatch, props ) => {
		const { id, } = props.match.params;

		if (id === 'add') {
			dispatch(addBookStart(values));
		}
		else {
			dispatch(editBookStart(values, id));
		}
		dispatch(setEditingMode(false));
	},
})(SingleBook);

const mapStateToProps = (state) => {
	const currentBook = state.books.currentBook;
	let bookData = {};

	if (currentBook && Object.keys(currentBook).length) {
		bookData = {
			title: currentBook.title,
			author: currentBook.author,
			country: currentBook.country,
			year: currentBook.year,
			language: currentBook.language,
			link: currentBook.link,
			pages: currentBook.pages,
			rating: currentBook.rating,
			imageLink: currentBook.imageLink,
		}
	}

	return ({
		currentBook: state.books.currentBook,
		processing: state.books.processing,
		initialValues: { ...bookData, },
		language: bookData.language,
		languages: state.books.languages,
		ratings: state.books.ratings,
		rating: bookData.rating,
		title: bookData.title,
		processingRatings: state.books.processingRatings,
		processingLanguages: state.books.processingLanguages,
		editingMode: state.books.editingMode,
		modalMessage: state.books.modalMessage,
		modalTitle: state.books.modalTitle,
	})
}

const mapDispatchToProps = (dispatch) => ({
	getCurrentBookStart: (id) => dispatch(getCurrentBookStart(id)),
	getLanguagesStart: () => dispatch(getLanguagesStart()),
	getRatingsStart: () => dispatch(getRatingsStart()),
	setEditingMode: (value) => dispatch(setEditingMode(value)),
	deleteBookStart: (id) => dispatch(deleteBookStart(id)),
	clearTableParams: () => dispatch(clearTableParams()),
	clearCurrentBook: () => dispatch(clearCurrentBook()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SingleBookContainer);