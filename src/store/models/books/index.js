export const initialState = {
	processing: false,
	url: '',
	books: [],
	numberOfBooks: 0,
	error: {},
}

export const types = {
	GET_BOOKS_START: 'GET_BOOKS_START',
	GET_BOOKS_SUCCESS: 'GET_BOOKS_SUCCESS',
	GET_BOOKS_FAILURE: 'GET_BOOKS_FAILURE',
}

export * from './actions'
export * from './sagas'

export default (state = initialState, action) => action.type in types ? { ...state, ...action.payload, } : state