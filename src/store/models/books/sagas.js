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
	buyBooksSuccess,
	buyBooksFailure,

} from './index';
import { openMessageModal, } from '../messageModal';
import { apiService, } from '../../../services';
import history from '../../routingHistory';
import { formRatingsArray, } from '../../../helpers';

function* getBooksSaga(action) {
	const { params, } = action.payload;

	try {
		const res = yield call(apiService, 'GET', '/books', { params, } );
		yield put(getBooksSuccess(res.data, res.headers['x-total-count']));
	}
	catch (error) {
		yield put(getBooksFailure())
	}
}

function* getCurrentBookSaga(action) {
	const { id, } = action.payload;

	try {
		const res = yield call(apiService, 'GET', `/books/${id}` );
		yield put(getCurrentBookSuccess(res.data));
	}
	catch (error) {
		yield put(getCurrentBookFailure());
	}
}

function* getLanguagesSaga() {
	try {
		const res = yield call(apiService, 'GET', '/languages' );
		yield put(getLanguagesSuccess(res.data));
	}
	catch (error) {
		yield put(getLanguagesFailure())
	}
}

function* getRatingsSaga() {
	try {
		const res = yield call(apiService, 'GET', '/ratings' );
		const ratings = formRatingsArray(res.data);
		yield put(getRatingsSuccess(ratings));
	}
	catch (error) {
		yield put(getRatingsFailure())
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
		yield put(editBookFailure());
	}
}

function* deleteBookSaga(action) {
	const { id, } = action.payload;
	const url = `/books/${id}`;

	try {
		yield call(apiService, 'DELETE', url);
		yield put(openMessageModal('The book was successfully deleted', 'Success'))
		yield put(deleteBookSuccess());
		history.push('/books');
	}
	catch (error) {
		yield put(deleteBookFailure());
	}
}

function* addBookSaga(action) {
	const { bookData, } = action.payload;

	try {
		const res = yield call(apiService, 'POST', '/books', { data: bookData, });
		const { id, } = res.data;
		history.push(`/book/${id}`);
		yield put(openMessageModal('The book was successfully added to the catalogue', 'Success'))
		yield put(addBookSuccess(res.data))
	}
	catch (error) {
		yield put(addBookFailure());
	}
}

function* buyBooksSaga(action) {
	const { buyBooksData, } = action.payload;

	try {
		yield call(apiService, 'POST', '/buy_books', { data: buyBooksData, });
		yield put(openMessageModal('Congratulations! You have successfully bought the books!', 'Success'))
		yield put(buyBooksSuccess());
		history.push('/account');
	}
	catch (error) {
		yield put(buyBooksFailure())
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
		takeLatest(types.BUY_BOOKS_START, buyBooksSaga)
	]);
}

export default watchGetBooksSaga;