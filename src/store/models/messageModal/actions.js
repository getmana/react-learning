import { types, } from './index'

export const openMessageModal = (message, title) => ({
	type: types.OPEN_MESSAGE_MODAL,
	payload: {
		message,
		title,
	},
})

export const closeMessageModal = () => ({
	type: types.CLOSE_MESSAGE_MODAL,
	payload: {
		message: '',
		title: '',
	},
})