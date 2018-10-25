import { HTTP, } from './httpConfig';
import history from '../store/routingHistory';

const apiService = (method, url, params) => {
	return HTTP({
		method,
		url,
		params,
	}).then(res => {
		return res.data;
	},
	error => {
		if (error.response.status === 401) {
			history.push('/login')
		}
		throw new Error(error.response.data);
	}
	)
}

export default apiService;