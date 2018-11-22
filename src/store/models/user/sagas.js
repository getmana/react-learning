import { takeLatest, put, call, all, } from 'redux-saga/effects';
import { loginSuccess, loginFailure, types, } from './index';
import { openMessageModal, } from '../messageModal';
import { apiService, localStorageService, } from '../../../services';
import history from '../../routingHistory';

function* loginSaga(action) {
	const { phone, email, password, } = action.meta.data;
	let data = action.meta.data;

	if (phone && email) {
		data = { phone, password, }
	}
	localStorageService.clearLocalStorage();

	try {
		const res = yield call(apiService, 'GET', '/auth', { params: data, });
		history.push('/account');
		yield put(openMessageModal('Hello! Welcome to your account', 'Success'))
		localStorageService.setLocalStorageItem('token', res.data.token);
		yield put(loginSuccess(res.username, res.userId, res.token));
	}
	catch (error) {
		yield put(loginFailure())
	}
}

function* watchLoginSaga() {
	yield all([ takeLatest(types.LOGIN_START, loginSaga) ]);
}

export default watchLoginSaga;