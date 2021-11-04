import { createStyles, WithStyles } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Player } from '../../components/Player/Player';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
    });

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
}

const DashboardComponent: React.FC<Props> = ({ classes }) => {
    return <Player />;
};

export const Dashboard = withStyles(styles, { withTheme: true })(React.memo(DashboardComponent));
