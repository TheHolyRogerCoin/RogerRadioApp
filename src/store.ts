import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { appReducer } from './modules';

const sagaMiddleware = createSagaMiddleware();
const websocketsMiddleware = createSagaMiddleware();

// tslint:disable-next-line:no-any
const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(appReducer, composeEnhancer(applyMiddleware(sagaMiddleware, websocketsMiddleware)));

export { store, sagaMiddleware, websocketsMiddleware };
