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

export const getBooksFailure = error => ({
	type: types.GET_BOOKS_FAILURE,
	payload: {
		error,
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

export const getCurrentBookFailure = error => ({
	type: types.GET_CURRENT_BOOK_FAILURE,
	payload: {
		modalMessage: error,
		modalTitle: 'Error',
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

export const getLanguagesFailure = (error) => ({
	type: types.GET_LANGUAGES_SUCCESS,
	payload: {
		modalMessage: error,
		modalTitle: 'Error',
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

export const getRatingsFailure = (error) => ({
	type: types.GET_RATINGS_SUCCESS,
	payload: {
		modalMessage: error,
		modalTitle: 'Error',
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

export const editBookFailure = error => ({
	type: types.EDIT_BOOK_FAILURE,
	payload: {
		modalMessage: error,
		modalTitle: 'Error',
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

export const deleteBookSuccess = modalMessage => ({
	type: types.DELETE_BOOK_SUCCESS,
	payload: {
		modalMessage,
		modalTitle: 'Success',
		processing: false,
	},
})

export const deleteBookFailure = error => ({
	type: types.DELETE_BOOK_FAILURE,
	payload: {
		modalMessage: error,
		modalTitle: 'Error',
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
		modalMessage: 'The book was successfully added to the catalogue',
		modalTitle: 'Success',
	},
})

export const addBookFailure = error => ({
	type: types.ADD_BOOK_FAILURE,
	payload: {
		modalMessage: error,
		modalTitle: 'Error',
		processing: false,
	},
})

export const clearCurrentBook = () => ({
	type: types.CLEAR_CURRENT_BOOK,
	payload: {
		currentBook: {},
	},
})

export const clearModalInfo = () => ({
	type: types.CLEAR_MODAL_INFO,
	payload: {
		modalTitle: '',
		modalMessage: '',
	},
})