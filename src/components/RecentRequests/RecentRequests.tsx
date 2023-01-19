import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import * as React from 'react';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { truncateString } from '../../helpers/truncateString';
import { useViewportSize } from '../../hooks/useViewportSize';
import { RecentRequestsItem, selectRadioRecentRequests } from '../../modules/radioStatus';

TimeAgo.addDefaultLocale(en);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    recentRequests: {
        position: 'relative',
    },
    title: {
        position: 'relative',
    },
    plItems: {
        fontSize: '0.75em',
    },
}));

const checkSmallSize = (width) => {
    return width < 600 ? true : false;
};

const RecentRequestsComponent: React.FC = () => {
    const classes = useStyles();

    // const [curTime, setCurTime] = React.useState(Math.floor(Date.now() / 1000));

    const { width: viewport_width, height: _ } = useViewportSize();
    const recentRequests = useSelector(selectRadioRecentRequests);

    const renderRecentRequestsItem = React.useCallback(
        (plItem: RecentRequestsItem, index: number) => {
            return (
                <React.Fragment key={`${index}`}>
                    <Grid key={`${index}-pos`} item xs={4}>
                        {truncateString(plItem.FromUser, checkSmallSize(viewport_width) ? 15 : -1)}
                    </Grid>
                    <Grid key={`${index}-tit`} item xs={7} sm={6}>
                        {truncateString(plItem.TrkPretty, checkSmallSize(viewport_width) ? 35 : -1)}
                    </Grid>
                    <Grid key={`${index}-dat`} item xs={1} sm={2}>
                        <ReactTimeAgo
                            date={Date.parse(plItem.Date)}
                            locale="en-US"
                            timeStyle={checkSmallSize(viewport_width) ? 'mini-now' : 'round-minute'}
                        />
                    </Grid>
                </React.Fragment>
            );
        },
        [viewport_width]
    );

    return (
        <div className={classes.recentRequests}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <span className={classes.title}>Recent requests...</span>
                </Grid>
                <Grid item xs={12}>
                    <Grid className={classes.plItems} container spacing={1} alignItems="center">
                        {recentRequests.map(renderRecentRequestsItem)}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export const RecentRequests = React.memo(RecentRequestsComponent);
