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

export const getLanguagesStart = () => ({
	type: types.GET_LANGUAGES_START,
})

export const getLanguagesSuccess = (languages) => ({
	type: types.GET_LANGUAGES_SUCCESS,
	payload: {
		languages,
	},
})

export const getLanguagesFailure = (errorLanguages) => ({
	type: types.GET_LANGUAGES_SUCCESS,
	payload: {
		errorLanguages,
	},
})