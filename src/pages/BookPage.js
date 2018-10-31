import React, { Component, Fragment, } from 'react';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import { getBooksStart, } from '../store/models/books';
import styled from 'styled-components';
import { PageTitle, Spinner, Title, } from '../components';

const PageThemed = styled.div`
	padding: 20px;
	flex: 1 0 280px;
`;

const UlThemed = styled.ul`

`;

const LiThemed = styled.li`
    color: ${props => props.theme.primary};
    padding: 5px 20px;

    span {
        font-weight: 500;
    }
`;

export class BookPage extends Component {
	componentDidMount() {
		const { location, } = this.props;
		const id = location.pathname.slice(6);
		this.props.getBooksStart({ id, });
	}

	render() {
		const { books, processing, } = this.props;

		return (
			<PageThemed>
				<PageTitle>Book Details</PageTitle>
				{
					processing ?
						<Spinner size="50px" />
						:
						books.map((book, index) => {
							return (
								<Fragment key={index}>
									<Title>{book.title}</Title>
									<UlThemed>
										<LiThemed>
											<span>Author:&nbsp;</span>

											{book.author}
										</LiThemed>
										<LiThemed>
											<span>Country:&nbsp;</span>

											{book.country}
										</LiThemed>
										<LiThemed>
											<span>Year:&nbsp;</span>

											{book.year}
										</LiThemed>
										<LiThemed>
											<span>Language:&nbsp;</span>

											{book.language}
										</LiThemed>
										<LiThemed>
											<span>Link:&nbsp;</span>

											{book.link}
										</LiThemed>
										<LiThemed>
											<span>Pages:&nbsp;</span>

											{book.pages}
										</LiThemed>
									</UlThemed>
								</Fragment>
							)
						})
				}
			</PageThemed>
		)
	}
}

BookPage.propTypes = {
	books: PropTypes.arrayOf(PropTypes.object),
	getBooksStart: PropTypes.func.isRequired,
	processing: PropTypes.bool.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}),
}

const mapStateToProps = (state) => {
	return ({
		books: state.books.books,
		processing: state.books.processing,
	})
}

const mapDispatchToProps = (dispatch) => ({
	getBooksStart: (params) => {
		const { id, } = params;
		const queryString = `?id=${id}`;
		dispatch(getBooksStart(queryString))
	},
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BookPage);