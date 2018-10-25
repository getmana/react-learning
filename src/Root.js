import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, } from 'react-redux';
import store from './store';
import { Router, } from './components';
import { App, } from './pages';
import routingHistory from './store/routingHistory';
import 'reset-css';

function Root() {
	return (
		<Provider store={store}>
			<Router history={routingHistory}>
				<App />
			</Router>
		</Provider>
	)
}

ReactDOM.render(<Root />, document.getElementById('root'));