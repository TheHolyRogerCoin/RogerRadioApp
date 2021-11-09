import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Router } from 'react-router';

const browserHistory = createBrowserHistory();

const RouterContainer = React.lazy(() => import('./router/Router').then(({ AppRouter }) => ({ default: AppRouter })));

const AlertsContainer = React.lazy(() =>
    import('./containers/Alert/Alerts').then(({ Alerts }) => ({ default: Alerts }))
);

const LayoutContainer = React.lazy(() => import('./router/Layout').then(({ Layout }) => ({ default: Layout })));
const PlayerInterfaceContainer = React.lazy(() =>
    import('./components/Player/PlayerInterface').then(({ PlayerInterface }) => ({ default: PlayerInterface }))
);

export const App: React.FC = () => {
    return (
        <Router history={browserHistory}>
            <React.Suspense fallback={null}>
                <PlayerInterfaceContainer />
                <LayoutContainer>
                    <AlertsContainer />
                    <RouterContainer />
                </LayoutContainer>
            </React.Suspense>
        </Router>
    );
};
