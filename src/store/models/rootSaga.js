import { fork, } from 'redux-saga/effects'
import watchLoginSaga from './user/sagas'

export default function* rootSaga() {
	yield fork(watchLoginSaga);
}