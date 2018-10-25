export const initialState = {
	processing: false,
	data: {},
	error: {},
}

export const types = {
	LOGIN_START: 'LOGIN_START',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_FAILURE: 'LOGIN_FAILURE',
}

export * from './actions'
export * from './sagas'

export default (state = initialState, action) => action.type in types ? { ...state, ...action.payload, } : state