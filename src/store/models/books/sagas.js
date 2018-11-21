import { takeLatest, put, call, all, } from 'redux-saga/effects';
import {
	getBooksSuccess,
	getBooksFailure,
	getCurrentBookSuccess,
	getCurrentBookFailure,
	types,
	getLanguagesSuccess,
	getLanguagesFailure,
	getRatingsSuccess,
	getRatingsFailure,
	editBookSuccess,
	editBookFailure,
	deleteBookSuccess,
	deleteBookFailure,
	addBookSuccess,
	addBookFailure,

} from './index';
import { apiService, } from '../../../services';
import history from '../../routingHistory';
import { FormRatingsArray, } from '../../../helpers';

function* getBooksSaga(action) {
	const { params, } = action.payload;

	try {
		const res = yield call(apiService, 'GET', '/books', { params, } );
		yield put(getBooksSuccess(res.data, res.headers['x-total-count']));
	}
	catch (error) {
		yield put(getBooksFailure(error.message))
	}
}

function* getCurrentBookSaga(action) {
	const { id, } = action.payload;

	try {
		const res = yield call(apiService, 'GET', `/books/${id}` );
		yield put(getCurrentBookSuccess(res.data));
	}
	catch (error) {
		yield put(getCurrentBookFailure(error.message))
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

function* getRatingsSaga() {
	try {
		const res = yield call(apiService, 'GET', '/ratings' );
		const ratings = FormRatingsArray.formArray(res.data);
		yield put(getRatingsSuccess(ratings));
	}
	catch (error) {
		yield put(getRatingsFailure(error.message))
	}
}

function* editBookSaga(action) {
	const { bookData, id, } = action.payload;
	const url = `/books/${id}`;

	try {
		const res = yield call(apiService, 'PATCH', url, { data: bookData, } );
		yield put(editBookSuccess(res.data));
	}
	catch (error) {
		yield put(editBookFailure(error.message));
	}
}

function* deleteBookSaga(action) {
	const { id, } = action.payload;
	const url = `/books/${id}`;

	try {
		yield call(apiService, 'DELETE', url);
		// history.push('/books');
		yield put(deleteBookSuccess('The book was successfully deleted'));
	}
	catch (error) {
		yield put(deleteBookFailure(error.message));
	}
}

function* addBookSaga(action) {
	const { bookData, } = action.payload;

	try {
		const res = yield call(apiService, 'POST', '/books', { data: bookData, });
		const { id, } = res.data;
		history.push(`/book/${id}`);
		yield put(addBookSuccess(res.data))
	}
	catch (error) {
		yield put(addBookFailure(error.message));
	}
}

function* watchGetBooksSaga() {
	yield all([
		takeLatest(types.GET_BOOKS_START, getBooksSaga),
		takeLatest(types.GET_LANGUAGES_START, getLanguagesSaga),
		takeLatest(types.GET_RATINGS_START, getRatingsSaga),
		takeLatest(types.EDIT_BOOK_START, editBookSaga),
		takeLatest(types.DELETE_BOOK_START, deleteBookSaga),
		takeLatest(types.ADD_BOOK_START, addBookSaga),
		takeLatest(types.GET_CURRENT_BOOK_START, getCurrentBookSaga),
	]);
}

export default watchGetBooksSaga;