import { createStore, applyMiddleware, combineReducers, } from 'redux'
import { composeWithDevTools, } from 'redux-devtools-extension'
import { connectRouter, } from 'connected-react-router'
import * as middlewares from './middlewares'
import * as reducers from './models'
import rootSaga from './models/rootSaga'
import routingHistory from './routingHistory'

// Collect middlewares
let middlewareList = Object.values(middlewares)
if (process.env.NODE_ENV !== 'production')
	middlewareList.push(require('redux-immutable-state-invariant').default())

// Create store.
const rootReducer = combineReducers(reducers)
const initialState = {}
const enhancer = composeWithDevTools(applyMiddleware(...middlewareList))
const store = createStore(connectRouter(routingHistory)(rootReducer), initialState, enhancer)

// Run sagas.
middlewares.saga.run(rootSaga)

export default store