// tslint:disable:no-submodule-imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import('./store').then(({ websocketsMiddleware, sagaMiddleware, store }) => {
    import('./modules/index').then(({ rootSaga, websocketsSagas }) => {
        import('./components/Player/PlayerInterface').then(({ PlayerInterface }) => {
            import('./App').then(({ App }) => {
                sagaMiddleware.run(rootSaga);
                websocketsMiddleware.run(websocketsSagas);

                const render = () =>
                    ReactDOM.render(
                        <Provider store={store}>
                            <PlayerInterface />
                            <App />
                        </Provider>,
                        document.getElementById('root') as HTMLElement
                    );

                render();
            });
        });
    });
});
