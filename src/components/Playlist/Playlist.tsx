import { makeStyles } from '@mui/styles';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import TagIcon from '@mui/icons-material/Tag';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { checkViewportSmallSize } from '../../helpers/checkViewportSmallSize';
import { truncateString } from '../../helpers/truncateString';
import { useViewportSize } from '../../hooks/useViewportSize';
import { selectRadioPlaylist } from '../../modules/radioStatus';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    playlist: {
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

const PlaylistComponent: React.FC = () => {
    const classes = useStyles();

    // const [curTime, setCurTime] = React.useState(Math.floor(Date.now() / 1000));

    const { width: viewport_width, height: _ } = useViewportSize();
    const playlist = useSelector(selectRadioPlaylist);

    const renderPlaylistItem = React.useCallback(
        (plItem, index: number) => {
            return (
                <TableRow key={`${index}`}>
                    <TableCell component="th" scope="row">
                        {plItem.Position}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {truncateString(plItem.Artist, checkViewportSmallSize(viewport_width) ? 50 : -1)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {truncateString(plItem.Title, checkViewportSmallSize(viewport_width) ? 50 : -1)}
                    </TableCell>
                </TableRow>
            );
        },
        [viewport_width]
    );

    return (
        <div className={classes.playlist}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <span className={classes.title}>Rogering You Next With...</span>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer className={classes.plItems}>
                        <Table padding="none" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        <TagIcon className={classes.headImg} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <InterpreterModeIcon className={classes.headImg} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <AudiotrackIcon className={classes.headImg} />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{playlist.map(renderPlaylistItem)}</TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export const Playlist = React.memo(PlaylistComponent);
