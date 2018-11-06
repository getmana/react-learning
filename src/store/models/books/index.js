export const initialState = {
	processing: false,
	url: '',
	books: [],
	numberOfBooks: 0,
	error: {},
	languages: [],
	errorLanguages: {},
}

export const types = {
	GET_BOOKS_START: 'GET_BOOKS_START',
	GET_BOOKS_SUCCESS: 'GET_BOOKS_SUCCESS',
	GET_BOOKS_FAILURE: 'GET_BOOKS_FAILURE',

	GET_LANGUAGES_START: 'GET_LANGUAGES_START',
	GET_LANGUAGES_SUCCESS: 'GET_LANGUAGES_SUCCESS',
	GET_LANGUAGES_FAILURE: 'GET_LANGUAGES_FAILURE',

	GET_RATINGS_START: 'GET_RATINGS_START',
	GET_RATINGS_SUCCESS: 'GET_RATINGS_SUCCESS',
	GET_RATINGS_FAILURE: 'GET_RATINGS_FAILURE',
}

export * from './actions'
export * from './sagas'

export default (state = initialState, action) => action.type in types ? { ...state, ...action.payload, } : state