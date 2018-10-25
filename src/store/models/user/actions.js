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

export const loginSuccess = data => ({
	type: types.LOGIN_SUCCESS,
	payload: {
		data,
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