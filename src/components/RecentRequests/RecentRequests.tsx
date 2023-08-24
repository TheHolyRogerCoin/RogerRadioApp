import { makeStyles } from '@mui/styles';
import AccessibleIcon from '@mui/icons-material/Accessible';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import * as React from 'react';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import { checkViewportSmallSize } from '../../helpers/checkViewportSmallSize';
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
    headImg: {
        fontSize: '1.5rem !important',
    },
}));

const RecentRequestsComponent: React.FC = () => {
    const classes = useStyles();

    // const [curTime, setCurTime] = React.useState(Math.floor(Date.now() / 1000));

    const { width: viewport_width, height: _ } = useViewportSize();
    const recentRequests = useSelector(selectRadioRecentRequests);

    const renderRecentRequestsItem = React.useCallback(
        (plItem: RecentRequestsItem, index: number) => {
            return (
                <TableRow key={`${index}`}>
                    <TableCell component="th" scope="row">
                        {truncateString(plItem.FromUser, checkViewportSmallSize(viewport_width) ? 15 : -1)}
                    </TableCell>
                    <TableCell>
                        {truncateString(plItem.TrkPretty, checkViewportSmallSize(viewport_width) ? 60 : -1)}
                    </TableCell>
                    <TableCell align="right">
                        <ReactTimeAgo
                            date={Date.parse(plItem.Date)}
                            locale="en-US"
                            timeStyle={checkViewportSmallSize(viewport_width) ? 'mini-now' : 'round-minute'}
                        />
                    </TableCell>
                </TableRow>
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
                    <TableContainer className={classes.plItems}>
                        <Table padding="none" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        <AccessibleIcon className={classes.headImg} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <AudiotrackIcon className={classes.headImg} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <ScheduleIcon className={classes.headImg} />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{recentRequests.map(renderRecentRequestsItem)}</TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export const RecentRequests = React.memo(RecentRequestsComponent);
