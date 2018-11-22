export const initialState = {
	message: '',
	title: '',
}

export const types = {
	OPEN_MESSAGE_MODAL: 'OPEN_MESSAGE_MODAL',
	CLOSE_MESSAGE_MODAL: 'CLOSE_MESSAGE_MODAL',
}

export * from './actions'

export default (state = initialState, action) => action.type in types ? { ...state, ...action.payload, } : state