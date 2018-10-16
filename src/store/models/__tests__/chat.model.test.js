import reducer, { initialState, types, updateMessages, selectMessages, } from '../chat'
import { webSocketChannelSaga, } from '../chat/sagas'
import { put, select, } from 'redux-saga/effects'
import { cloneableGenerator, } from 'redux-saga/utils'

describe('Model Chat', () => {
	it('should reducer return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	const messages = [ { timestamp: 1234567, message: 'test message', } ]
	const action = updateMessages(messages)

	it(`should create action "${types.UPDATE_MESSAGES}"`, () => {
		expect(action).toEqual({
			type: types.UPDATE_MESSAGES,
			payload: { messages, },
		})
	})

	it(`should reducer handle action "${types.UPDATE_MESSAGES}"`, () => {
		expect(reducer(undefined, action)).toEqual({ ...initialState, messages, })
	})

	// it('should work webSocketChannelSaga', () => {
	// 	const saga = cloneableGenerator(webSocketChannelSaga)(action)
	// 	expect(saga.next().value).toEqual(select(selectMessages))
	// 	expect(saga.next().value).toEqual(put(updateMessages(messages)))
	// 	expect(saga.next().done).toBeTruthy()
	// })
})