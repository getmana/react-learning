import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { getBooksStart, } from '../../store/models/books';
import { PageTitle, } from '../../components';
import { BuyBooksFirstPage, BuyBooksSecondPage, } from '../../modules';
import { PageThemed, } from './style';

const mapStateToProps = (state) => {
	return ({
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

export default class BuyBooks extends Component {
	state = {
		page: 1,
	}

	componentDidMount() {
		this.props.getBooksStart();
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
		const { page, } = this.state;
		const { books, } = this.props;

		return (
			<PageThemed>
				<PageTitle>Buy Books Page</PageTitle>
				{
					page === 1 &&
						<BuyBooksFirstPage onSubmit={this.nextPage} />
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
	getBooksStart: PropTypes.func,
}

BuyBooks.defaultProps = {
	books: [],
}