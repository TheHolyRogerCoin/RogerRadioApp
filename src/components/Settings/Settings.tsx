import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';

import * as React from 'react';
import { useDispatch } from 'react-redux';

import { setQuality, quality_mp3_max, quality_mp3_med } from '../../helpers/preferences';
import { usePrefFetchQuality } from '../../hooks/usePrefFetchQuality';
import { playerSetUrl } from '../../modules/player';

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
}));

const SettingsComponent: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [playerQuality, setPlayerQuality] = React.useState<string | undefined>(undefined);

    const prefPlayerQuality = usePrefFetchQuality();

    const handleChange = React.useCallback(
        (event: SelectChangeEvent) => {
            setQuality(event.target.value as string).then(() => {
                dispatch(playerSetUrl(undefined));
            });
            setPlayerQuality(event.target.value as string);
        },
        [dispatch]
    );

    const renderSettingsAbout = React.useCallback(() => {
        return (
            <TableRow key="s_version">
                <TableCell component="th" scope="row">
                    App Version
                </TableCell>
                <TableCell>{process.env.APP_VERSION}</TableCell>
            </TableRow>
        );
    }, []);

    const renderSettingsQuality = React.useCallback(() => {
        return (
            <TableRow key="s_quality">
                <TableCell component="th" scope="row">
                    Player Quality
                </TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <Select value={playerQuality || prefPlayerQuality} onChange={handleChange}>
                            <MenuItem value={quality_mp3_max}>Maximum (320)</MenuItem>
                            <MenuItem value={quality_mp3_med}>Medium (128)</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
            </TableRow>
        );
    }, [handleChange, playerQuality, prefPlayerQuality]);

    return (
        <div className={classes.settingsContainer}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <span className={classes.title}>Settings</span>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer className={classes.settingsItems}>
                        <Table padding="none" size="small">
                            <TableBody>
                                {renderSettingsAbout()}
                                {renderSettingsQuality()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export const Settings = React.memo(SettingsComponent);
