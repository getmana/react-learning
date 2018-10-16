import reducer, { initialState, types, signIn, signOut, } from '../app'
import { updateAuthData, } from '../app/actions'
import { push, } from '../router'
import { signInSaga, signOutSaga, generateId, } from '../app/sagas'
import { cloneableGenerator, } from 'redux-saga/utils'
import { delay, } from 'redux-saga'
import { put, call, } from 'redux-saga/effects'

jest.mock('redux-saga')

describe('Model app', () => {
	it('should reducer return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it(`should create action "${types.UPDATE_AUTH_DATA}"`, () => {
		const userId = 123456789
		expect(updateAuthData(userId)).toEqual({
			type: types.UPDATE_AUTH_DATA,
			payload: {
				userId,
			},
		})
	})

	it(`should reducer handle action "${types.UPDATE_AUTH_DATA}"`, () => {
		const userId = 123456789
		expect(reducer(initialState, updateAuthData(userId))).toEqual({ ...initialState, userId, })
	})

	it('should work signInSaga', () => {
		const action = signIn()
		const saga = cloneableGenerator(signInSaga)(action)

		expect(saga.next().value).toEqual(delay(1000))
		expect(saga.next().value).toEqual(call(generateId))
		expect(saga.next().value).toEqual(put(updateAuthData()))
		expect(saga.next().value).toEqual(put(push('./main')))
		expect(saga.next().done).toBeTruthy()
	})

	it('should work signOutSaga', () => {
		const action = signOut()
		const saga = cloneableGenerator(signOutSaga)(action)

		expect(saga.next().value).toEqual(delay(1000))
		expect(saga.next().value).toEqual(put(updateAuthData()))
		expect(saga.next().value).toEqual(put(push('./login')))
		expect(saga.next().done).toBeTruthy()
	})
})