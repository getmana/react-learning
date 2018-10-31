import { takeLatest, put, call, all, } from 'redux-saga/effects';
import { loginSuccess, loginFailure, types, } from './index';
import { apiService, localStorageService, } from '../../../services';
import history from '../../routingHistory';

function* loginSaga(action) {
	const { phone, email, password, } = action.meta.data;
	let data = action.meta.data;

	if (phone && email) {
		data = { phone, password, }
	}

	try {
		const res = yield call(apiService, 'GET', '/auth', data);
		history.push('/account');
		localStorageService.setLocalStorageItem('token', res.token);
		console.log('res saga', res)
		yield put(loginSuccess(res.username, res.userId, res.token));
	}
	catch (error) {
		yield put(loginFailure(error.message))
	}
}

function* watchLoginSaga() {
	yield all([ takeLatest(types.LOGIN_START, loginSaga) ]);
}

export default watchLoginSaga;