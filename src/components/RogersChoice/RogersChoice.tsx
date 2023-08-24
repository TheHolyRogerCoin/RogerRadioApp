import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';

import { checkViewportSmallSize } from '../../helpers/checkViewportSmallSize';
import { truncateString } from '../../helpers/truncateString';
import { useFetchUserBalance } from '../../hooks/useFetchUserBalance';
import { useFetchUserPendingRequests } from '../../hooks/useFetchUserPendingRequests';
import { usePrefFetchVoucherTokens } from '../../hooks/usePrefFetchVoucherTokens';
import { useViewportSize } from '../../hooks/useViewportSize';
import {
    PendingRequestsItem,
    selectBalanceData,
    selectCreateRequestLoading,
    selectPayRequestLoading,
    selectPendingRequestsData,
    tokenControlCreateRequestFetch,
    tokenControlPayRequestFetch,
} from '../../modules/tokenControl';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    settingsContainer: {
        position: 'relative',
    },
    title: {
        position: 'relative',
    },
    settingsItems: {
        fontSize: '0.75em',
    },
    voucherItems: {
        color: '#fff !important',
    },
    descriptionCol: {
        minWidth: '120px !important',
    },
    songRequestInput: {
        // maxWidth: '140px !important',
    },
    songPaymentButton: {
        // minWidth: '50px !important',
        padding: '6px 6px !important',
    },
    songRequestButton: {
        minWidth: '50px !important',
        padding: '6px 6px !important',
    },
    reqItems: {
        fontSize: '0.75em',
    },
    balanceBox: {
        fontSize: '0.75em',
        textAlign: 'center',
    },
}));

const RogersChoiceComponent: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [songRequestString, setSongRequestString] = React.useState<string>('');
    const [lastChange, setLastChange] = React.useState<number>(Date.now());

    const userBalance = useSelector(selectBalanceData);
    const userRequests = useSelector(selectPendingRequestsData);
    const createRequestLoading = useSelector(selectCreateRequestLoading);
    const payRequestLoading = useSelector(selectPayRequestLoading);

    const { width: viewport_width, height: _ } = useViewportSize();

    const prefVoucherTokens = usePrefFetchVoucherTokens({ lastChange });
    useFetchUserBalance({ tokens: prefVoucherTokens });
    useFetchUserPendingRequests({ tokens: prefVoucherTokens });

    // const handleChange = React.useCallback(
    //     (event: SelectChangeEvent) => {
    //         setQuality(event.target.value as string).then(() => {
    //             RogerRadioPlayer && RogerRadioPlayer.clearCachedStreamUrl();
    //             dispatch(playerSetUrl(undefined));
    //         });
    //         setPlayerQuality(event.target.value as string);
    //     },
    //     [dispatch]
    // );

    const handleSongRequestChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSongRequestString(event.target.value);
    }, []);

    const submitSongRequest = React.useCallback(() => {
        if (songRequestString.length > 0) {
            dispatch(
                tokenControlCreateRequestFetch({ song_request_string: songRequestString, tokens: prefVoucherTokens })
            );
            setLastChange(Date.now());
            setSongRequestString('');
        }
    }, [dispatch, songRequestString, prefVoucherTokens]);

    const paySongRequest = React.useCallback(() => {
        if (userRequests.length > 0) {
            dispatch(tokenControlPayRequestFetch({ tokens: prefVoucherTokens }));
            setLastChange(Date.now());
        }
    }, [dispatch, userRequests, prefVoucherTokens]);

    const renderUserRequestItem = React.useCallback(
        (uReq: PendingRequestsItem, index: number) => {
            return (
                <TableRow key={`${index}`}>
                    <TableCell component="th" scope="row">
                        {truncateString(uReq.TrkPretty, checkViewportSmallSize(viewport_width) ? 60 : -1)}
                    </TableCell>
                    <TableCell align="right">
                        <ReactTimeAgo
                            date={Date.parse(uReq.Date)}
                            locale="en-US"
                            timeStyle={checkViewportSmallSize(viewport_width) ? 'mini-now' : 'round-minute'}
                        />
                    </TableCell>
                </TableRow>
            );
        },
        [viewport_width]
    );

    const renderPaymentBox = React.useCallback(() => {
        return userRequests.length > 0 ? (
            <Grid item xs={12}>
                <Button
                    fullWidth
                    className={classes.songPaymentButton}
                    variant="contained"
                    disabled={payRequestLoading}
                    onClick={() => {
                        paySongRequest();
                    }}
                >
                    Tip Request
                </Button>
            </Grid>
        ) : null;
    }, [payRequestLoading, userRequests, paySongRequest, classes.songPaymentButton]);

    const renderUserRequestBox = React.useCallback(() => {
        return (
            <Grid item xs={12}>
                <TableContainer className={classes.reqItems}>
                    <Table padding="none" size="small">
                        <TableBody>{userRequests.map(renderUserRequestItem)}</TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        );
    }, [userRequests, renderUserRequestItem, classes.reqItems]);

    const renderRequestBox = React.useCallback(() => {
        return (
            <Grid item xs={12}>
                <Grid container spacing={0} alignItems="center" justifyContent="space-between">
                    <Grid item xs={9}>
                        <TextField
                            className={classes.songRequestInput}
                            value={songRequestString}
                            id="song-request-input"
                            size="small"
                            fullWidth
                            onChange={handleSongRequestChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            fullWidth
                            className={classes.songRequestButton}
                            variant="contained"
                            disabled={createRequestLoading}
                            onClick={() => {
                                submitSongRequest();
                            }}
                        >
                            Request
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }, [
        songRequestString,
        submitSongRequest,
        createRequestLoading,
        handleSongRequestChange,
        classes.songRequestInput,
        classes.songRequestButton,
    ]);

    const renderNoBalanceBox = React.useCallback(() => {
        return (
            <Grid item xs={12}>
                No vouchers.
            </Grid>
        );
    }, []);

    const renderBalanceBox = React.useCallback(() => {
        return userBalance > 0 ? (
            <Grid item xs={12}>
                <Box className={classes.balanceBox}>
                    <LibraryMusicIcon />
                    {userBalance}
                </Box>
            </Grid>
        ) : null;
    }, [userBalance, classes.balanceBox]);

    const renderMainRequestBox = React.useCallback(() => {
        return userBalance > 0 ? renderRequestBox() : renderNoBalanceBox();
    }, [userBalance, renderRequestBox, renderNoBalanceBox]);

    return (
        <div className={classes.settingsContainer}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <span className={classes.title}>Roger's Choice</span>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        {renderBalanceBox()}
                        {renderMainRequestBox()}
                        {renderPaymentBox()}
                        {renderUserRequestBox()}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export const RogersChoice = React.memo(RogersChoiceComponent);
