import { delay, } from 'redux-saga'
import { put, call, } from 'redux-saga/effects'
import { cloneableGenerator, } from 'redux-saga/utils'
import { changeCity, updateCities, } from '../searchCity'
import { changeCitySaga, getCitiesRequest, } from '../searchCity/sagas'
import { api, } from '../../../services'

jest.mock('redux-saga')

describe('Model searchCity', () => {
	const generator = cloneableGenerator(changeCitySaga)

	it('should work changeCitySaga with few length query', () => {
		const city = 'L'
		const action = changeCity(city)
		const saga = generator(action).clone()

		expect(saga.next().value).toEqual(delay(500))
		expect(saga.next().value).toEqual(put(updateCities()))
		expect(saga.next().done).toBeTruthy()
	})

	it('should work changeCitySaga with valid length query', () => {
		const city = 'London'
		const action = changeCity(city)
		const saga = generator(action).clone()

		expect(saga.next().value).toEqual(delay(500))
		expect(saga.next().value).toEqual(call(api.np, getCitiesRequest(city)))
		expect(saga.next().value).toEqual(put(updateCities()))
		expect(saga.next().done).toBeTruthy()
	})
})