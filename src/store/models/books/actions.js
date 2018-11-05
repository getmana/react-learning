import { types, } from './index'

export const getBooksStart = (queryString) => ({
	type: types.GET_BOOKS_START,
	payload: {
		processing: true,
		queryString,
	},
})

export const getBooksSuccess = (books, numberOfBooks) => ({
	type: types.GET_BOOKS_SUCCESS,
	payload: {
		books,
		numberOfBooks,
		processing: false,
	},
})

export const getBooksFailure = error => ({
	type: types.GET_BOOKS_FAILURE,
	payload: {
		error,
		processing: false,
	},
})