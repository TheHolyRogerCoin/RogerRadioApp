// tslint:disable:no-submodule-imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { App } from './App';
import { PlayerInterface } from './components/Player/PlayerInterface';
import { appReducer, rootSaga } from './modules';

// tslint:disable-next-line:no-any
const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(appReducer, composeEnhancer(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

const render = () =>
    ReactDOM.render(
        <Provider store={store}>
            <PlayerInterface />
            <App />
        </Provider>,
        document.getElementById('root') as HTMLElement
    );

render();
