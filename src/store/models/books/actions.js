import { types, } from './index'

export const getBooksStart = (params) => ({
	type: types.GET_BOOKS_START,
	payload: {
		processing: true,
		params,
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

export const getBooksFailure = () => ({
	type: types.GET_BOOKS_FAILURE,
	payload: {
		processing: false,
	},
})

export const getCurrentBookStart = (id) => ({
	type: types.GET_CURRENT_BOOK_START,
	payload: {
		processing: true,
		id,
	},
})

export const getCurrentBookSuccess = (currentBook) => ({
	type: types.GET_CURRENT_BOOK_SUCCESS,
	payload: {
		currentBook,
		processing: false,
	},
})

export const getCurrentBookFailure = () => ({
	type: types.GET_CURRENT_BOOK_FAILURE,
	payload: {
		processing: false,
	},
})

export const getLanguagesStart = () => ({
	type: types.GET_LANGUAGES_START,
	payload: {
		processingLanguages: true,
	},
})

export const getLanguagesSuccess = (languages) => ({
	type: types.GET_LANGUAGES_SUCCESS,
	payload: {
		languages,
		processingLanguages: false,
	},
})

export const getLanguagesFailure = () => ({
	type: types.GET_LANGUAGES_SUCCESS,
	payload: {
		processingLanguages: false,
	},
})

export const getRatingsStart = () => ({
	type: types.GET_RATINGS_START,
	payload: {
		processingRatings: true,
	},
})

export const getRatingsSuccess = (ratings) => ({
	type: types.GET_RATINGS_SUCCESS,
	payload: {
		ratings,
		processingRatings: false,
	},
})

export const getRatingsFailure = () => ({
	type: types.GET_RATINGS_SUCCESS,
	payload: {
		processingRatings: false,
	},
})

export const editBookStart = (bookData, id) => ({
	type: types.EDIT_BOOK_START,
	payload: {
		processing: true,
		bookData,
		id,
	},
})

export const editBookSuccess = (currentBook) => ({
	type: types.EDIT_BOOK_SUCCESS,
	payload: {
		currentBook,
		processing: false,
	},
})

export const editBookFailure = () => ({
	type: types.EDIT_BOOK_FAILURE,
	payload: {
		processing: false,
	},
})

export const setEditingMode = (editingMode) => ({
	type: types.SET_EDITING_MODE,
	payload: {
		editingMode,
	},
})

export const deleteBookStart = id => ({
	type: types.DELETE_BOOK_START,
	payload: {
		processing: true,
		id,
	},
})

export const deleteBookSuccess = () => ({
	type: types.DELETE_BOOK_SUCCESS,
	payload: {
		processing: false,
	},
})

export const deleteBookFailure = () => ({
	type: types.DELETE_BOOK_FAILURE,
	payload: {
		processing: false,
	},
})

export const addBookStart = bookData => ({
	type: types.ADD_BOOK_START,
	payload: {
		processing: true,
		bookData,
	},
})

export const addBookSuccess = currentBook => ({
	type: types.ADD_BOOK_SUCCESS,
	payload: {
		currentBook,
		processing: false,
	},
})

export const addBookFailure = () => ({
	type: types.ADD_BOOK_FAILURE,
	payload: {
		processing: false,
	},
})

export const clearCurrentBook = () => ({
	type: types.CLEAR_CURRENT_BOOK,
	payload: {
		currentBook: {},
	},
})

export const buyBooksStart = buyBooksData => ({
	type: types.BUY_BOOKS_START,
	payload: {
		processing: true,
		buyBooksData,
	},
})

export const buyBooksSuccess = () => ({
	type: types.BUY_BOOKS_SUCCESS,
	payload: {
		processing: false,
	},
})

export const buyBooksFailure = () => ({
	type: types.BUY_BOOKS_FAILURE,
	payload: {
		processing: false,
	},
})