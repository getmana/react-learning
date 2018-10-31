import { all, } from 'redux-saga/effects';
import watchLoginSaga from './user/sagas';
import watchGetBooksSaga from './books/sagas';

export default function* rootSaga() {
	yield all([
		watchLoginSaga(),
		watchGetBooksSaga()
	])
}