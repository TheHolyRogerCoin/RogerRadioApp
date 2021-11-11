import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Dashboard } from '../../screens/Dashboard/Dashboard';
import { PlaylistPage } from '../../screens/Playlist/Playlist';

const renderLoader = () => {
    return <div>Loading...</div>;
};

const AppRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, ...rest }) => {
    if (loading) {
        return renderLoader();
    }

    const renderCustomerComponent = (props) => <CustomComponent {...props} />;

    return <Route {...rest} render={renderCustomerComponent} />;
};

const Router: React.FC = () => {
    return (
        <Switch>
            {/* Main */}
            <AppRoute path="/" component={Dashboard} loading={false} exact={true} />
            <AppRoute path="/playlist" component={PlaylistPage} loading={false} exact={true} />
            <Route path="**">
                <Redirect to="/" />
            </Route>
        </Switch>
    );
};

export const AppRouter = React.memo(Router);
