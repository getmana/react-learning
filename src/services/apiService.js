import { HTTP, } from './httpConfig';
import history from '../store/routingHistory';
import localStorageService from './localStorageService';

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
		if (error.response.status === 401) {
			history.push('/login')
		}
		throw new Error(error.response.data);
	})
}

export default apiService;