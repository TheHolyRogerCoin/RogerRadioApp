// tslint:disable:no-submodule-imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { App } from './App';
import { PlayerInterface_Browser } from './components/Player/PlayerInterface_Browser';
import { appReducer, rootSaga } from './modules';
import { websocketsSagas } from './modules/websockets';

// tslint:disable-next-line:no-any
const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const websocketsMiddleware = createSagaMiddleware();

const store = createStore(appReducer, composeEnhancer(applyMiddleware(sagaMiddleware, websocketsMiddleware)));

sagaMiddleware.run(rootSaga);
websocketsMiddleware.run(websocketsSagas);

const render = () =>
    ReactDOM.render(
        <Provider store={store}>
            <PlayerInterface_Browser />
            <App />
        </Provider>,
        document.getElementById('root') as HTMLElement
    );

render();
