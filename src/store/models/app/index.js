export const initialState = {
	userId: null,
}

export const types = {
	ACTION: `ACTION`,
}

export default (state = initialState, action) => action.type in types ? { ...state, ...action.payload } : state