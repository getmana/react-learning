import { takeLatest, put, call, all, } from 'redux-saga/effects';
import { getBooksSuccess, getBooksFailure, types, getLanguagesSuccess, getLanguagesFailure, } from './index';
import { apiService, } from '../../../services';

function* getBooksSaga(action) {
	const { queryString, } = action.payload;
	const url = '/books' + queryString;

	try {
		const res = yield call(apiService, 'GET', url );
		yield put(getBooksSuccess(res.data, res.headers['x-total-count']));
	}
	catch (error) {
		yield put(getBooksFailure(error.message))
	}
}

function* getLanguagesSaga() {
	try {
		const res = yield call(apiService, 'GET', '/languages' );
		yield put(getLanguagesSuccess(res.data));
	}
	catch (error) {
		yield put(getLanguagesFailure(error.message))
	}
}

function* watchGetBooksSaga() {
	yield all([
		takeLatest(types.GET_BOOKS_START, getBooksSaga),
		takeLatest(types.GET_LANGUAGES_START, getLanguagesSaga)
	]);
}

export default watchGetBooksSaga;