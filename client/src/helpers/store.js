// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducerHelper';
import * as actionCreators from '../modules/actions';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = composeWithDevTools({ actionCreators, trace: true, traceLimit: 25 });
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, createLogger())));

export default store;
