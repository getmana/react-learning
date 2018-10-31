import { takeLatest, put, call, all, } from 'redux-saga/effects';
import { getBooksSuccess, getBooksFailure, types, } from './index';
import { apiService, } from '../../../services';

function* getBooksSaga(action) {
	const { queryString, } = action.payload;
	const url = '/books' + queryString;

	try {
		const res = yield call(apiService, 'GET', url );

		yield put(getBooksSuccess(res));
	}
	catch (error) {
		yield put(getBooksFailure(error.message))
	}
}

function* watchGetBooksSaga() {
	yield all([ takeLatest(types.GET_BOOKS_START, getBooksSaga) ]);
}

export default watchGetBooksSaga;