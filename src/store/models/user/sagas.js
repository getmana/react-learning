import { takeLatest, put, call, all, } from 'redux-saga/effects';
import { loginSuccess, loginFailure, types, } from './index';
import { apiService, } from '../../../services';
import history from '../../routingHistory';

function* loginSaga(action) {
	let { data, } = action.meta;
	let phone = '';

	if (data.phone) {
		phone = data.phone.replace( /-/g, '')
		data = {
			...data,
			phone,
		}
	}

	try {
		const res = yield call(apiService, 'GET', '/auth', data);
		history.push('/account')
		yield put(loginSuccess(res));
	}
	catch (error) {
		yield put(loginFailure(error.message))
	}
}

function* watchLoginSaga() {
	yield all([ takeLatest(types.LOGIN_START, loginSaga) ]);
}

export default watchLoginSaga;