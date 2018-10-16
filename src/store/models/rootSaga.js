import { fork, } from 'redux-saga/effects'
import app from './app/sagas'

export default function* rootSaga() {
	yield fork(app)
}