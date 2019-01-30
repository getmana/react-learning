import { HTTP, } from './httpConfig';
import history from '../store/routingHistory';
import localStorageService from './localStorageService';
import store from '../store';
import { openMessageModal, } from '../store/models/messageModal';

const apiService = (method, url, requestData) => {
	const { params, data, } = requestData || {};
	const token = localStorageService.getLocalStorageItem('token');
	const requestParams = { ...params, };

	if (token) {
		requestParams.token = token;
	}

	return HTTP({
		method,
		url,
		params: requestParams,
		data,
	}).then(res => {
		return res;
	}).catch(error => {
		let message = '';

		if (error.response.status === 401) {
			message = 'Please, sign in to your account'
			history.push('/login')
		}
		else if (error.response.status === 403) {
			message = 'The login or the password is incorrect'
		}
		else if (typeof error.response.data === 'object' && Object.keys(error.response.data).length === 0) {
			message = 'Ooops... Something went wrong... Please, try later.'
		}
		else {
			message = error.response.data
		}
		console.log('error apiService', error.response.data)
		store.dispatch(openMessageModal(message, 'Error'))
		throw new Error(error.response.data);
	})
}

export default apiService;