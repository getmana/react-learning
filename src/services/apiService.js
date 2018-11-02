import { HTTP, } from './httpConfig';
import history from '../store/routingHistory';
import localStorageService from './localStorageService';

const apiService = (method, url, requestData) => {
	const params = requestData || {};
	const token = localStorageService.getLocalStorageItem('token');

	if (token) {
		params.token = token;
	}

	return HTTP({
		method,
		url,
		params,
	}).then(res => {
		return res;
	}).catch(error => {
		if (error.response.status === 401) {
			history.push('/login')
		}
		throw new Error(error.response.data);
	})
}

export default apiService;