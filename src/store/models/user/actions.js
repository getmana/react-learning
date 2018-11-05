import { types, } from './index'

export const loginStart = (data) => ({
	type: types.LOGIN_START,
	payload: {
		processing: true,
	},
	meta: {
		data,
	},
})

export const loginSuccess = (username, userId, token) => ({
	type: types.LOGIN_SUCCESS,
	payload: {
		username,
		userId,
		token,
		processing: false,
	},
})

export const loginFailure = error => ({
	type: types.LOGIN_FAILURE,
	payload: {
		error,
		processing: false,
	},
})