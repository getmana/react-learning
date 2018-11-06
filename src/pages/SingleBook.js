import React, { Component, Fragment, } from 'react';
import { reduxForm, connect, } from '../decorators';
import PropTypes from 'prop-types';
import { getBooksStart, getLanguagesStart, } from '../store/models/books';
import styled from 'styled-components';
import { PageTitle, Spinner, Title, Input, Button, Form, Field, Dropdown, } from '../components';

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

const LiThemed = styled.li`
    color: ${props => props.theme.primary};
    padding: 5px 20px;

    span {
        font-weight: 500;
    }
`;

export class SingleBook extends Component {
	state = {
		editing: false,
	}

	componentDidMount() {
		const { location, } = this.props;
		const id = location.pathname.slice(6);
		this.props.getLanguagesStart();
		this.props.getBooksStart({ id, });
	}

	handleClickEdit = () => {
		this.setState({
			editing: true,
		})
	}

	handleClickCancel = () => {
		this.setState({
			editing: false,
		})
	}

	render() {
		const { processing, handleSubmit, } = this.props;
		const { editing, } = this.state;
		const style = {
			'border': 'none',
		}

		return (
			<PageThemed>
				<PageTitle>Book Details</PageTitle>
				{
					processing ?
						<Spinner size="50px" />
						:
						<FormBox>
							<Form onSubmit={handleSubmit}>
								<Field
									name="title"
									component={Input}
									type="text"
									label="Book Title:"
									disabled={!editing}
									style={!editing ? style : {}}
								/>
								<Field
									name="author"
									component={Input}
									type="text"
									label="Book Author:"
									disabled={!editing}
									style={!editing ? style : {}}
								/>
								<Field
									name="country"
									component={Input}
									type="text"
									label="Country:"
									disabled={!editing}
									style={!editing ? style : {}}
								/>
								<Field
									name="year"
									component={Input}
									type="text"
									label="Year:"
									disabled={!editing}
									style={!editing ? style : {}}
								/>
								<Field
									name="language"
									component={Input}
									type="text"
									label="Book Language:"
									disabled={!editing}
									style={!editing ? style : {}}
								/>
								<Field
									name="link"
									component={Input}
									type="text"
									label="Book Link:"
									disabled={!editing}
									style={!editing ? style : {}}
								/>
								<Field
									name="pages"
									component={Input}
									type="number"
									label="Number of Pages:"
									disabled={!editing}
									style={!editing ? style : {}}
								/>
								{
									editing &&
										<ButtonBox>
											<Button style="primary">Save Changes</Button>
											<Button style="primary" onClick={this.handleClickCancel}>Cancel</Button>
										</ButtonBox>
								}
								{
									!editing &&
									<ButtonBox>
										<Button style="primary" onClick={this.handleClickEdit}>Edit Book Info</Button>
										<Button style="primary">Delete Book</Button>
									</ButtonBox>
								}
							</Form>
						</FormBox>
				}
			</PageThemed>
		)
	}
}

SingleBook.propTypes = {
	books: PropTypes.arrayOf(PropTypes.object),
	getBooksStart: PropTypes.func.isRequired,
	processing: PropTypes.bool.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}),
}

const SingleBookContainer = reduxForm({
	form: 'singleBookForm',
	enableReinitialize: true,
	onSubmit: (values, dispatch ) => {
		dispatch(getBooksStart(values));
	},
})(SingleBook);

const mapStateToProps = (state) => {
	const books = state.books.books;
	let bookData = {};

	if (books && Object.keys(books).length) {
		let singleBook = books[0];
		bookData = {
			title: singleBook.title,
			author: singleBook.author,
			country: singleBook.country,
			year: singleBook.year,
			language: singleBook.language,
			link: singleBook.link,
			pages: singleBook.pages,
		}
	}

	return ({
		books: state.books.books,
		processing: state.books.processing,
		initialValues: { ...bookData, },
	})
}

const mapDispatchToProps = (dispatch) => ({
	getBooksStart: (params) => {
		const { id, } = params;
		const queryString = `?id=${id}`;
		dispatch(getBooksStart(queryString))
	},
	getLanguagesStart: () => dispatch(getLanguagesStart()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SingleBookContainer);