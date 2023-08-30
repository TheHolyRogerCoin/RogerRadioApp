import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

import * as React from 'react';
import { useDispatch } from 'react-redux';

import { RogerRadioPlayer } from '@ionic-native/roger-radio-player';

import { checkViewportSmallSize } from '../../helpers/checkViewportSmallSize';
import {
    setQuality,
    quality_mp3_max,
    quality_mp3_med,
    quality_mp3_trash,
    addVoucherToken,
} from '../../helpers/preferences';
import { useFetchUserBalance } from '../../hooks/useFetchUserBalance';
import { usePrefFetchQuality } from '../../hooks/usePrefFetchQuality';
import { usePrefFetchVoucherTokens } from '../../hooks/usePrefFetchVoucherTokens';
import { useViewportSize } from '../../hooks/useViewportSize';
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
    voucherItems: {
        color: '#fff !important',
    },
    descriptionCol: {
        minWidth: '120px !important',
    },
    newVoucherInput: {
        // maxWidth: '140px !important',
    },
    newVoucherButton: {
        minWidth: '50px !important',
        padding: '6px 6px !important',
    },
}));

const SettingsComponent: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [playerQuality, setPlayerQuality] = React.useState<string | undefined>(undefined);
    const [addingVoucher, setAddingVoucher] = React.useState<string>('');
    const [lastChange, setLastChange] = React.useState<number>(Date.now());

    const { width: viewport_width, height: _ } = useViewportSize();
    const prefVoucherTokens = usePrefFetchVoucherTokens({ lastChange });
    const prefPlayerQuality = usePrefFetchQuality();
    useFetchUserBalance({ tokens: prefVoucherTokens });

    const handleChange = React.useCallback(
        (event: SelectChangeEvent) => {
            setQuality(event.target.value as string).then(() => {
                RogerRadioPlayer && RogerRadioPlayer.clearCachedStreamUrl();
                dispatch(playerSetUrl(undefined));
            });
            setPlayerQuality(event.target.value as string);
        },
        [dispatch]
    );

    const handleVoucherChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAddingVoucher(event.target.value);
    }, []);

    const addNewVoucher = React.useCallback(() => {
        if (addingVoucher.length > 0) {
            addVoucherToken(addingVoucher).then(() => {
                setLastChange(Date.now());
                setAddingVoucher('');
            });
        }
    }, [addingVoucher]);

    const renderSettingsAbout = React.useCallback(() => {
        return (
            <TableRow key="s_version">
                <TableCell className={classes.descriptionCol} component="th" scope="row">
                    App Version
                </TableCell>
                <TableCell>{process.env.APP_VERSION}</TableCell>
            </TableRow>
        );
    }, [classes.descriptionCol]);

    const renderSettingsQuality = React.useCallback(() => {
        return (
            <TableRow key="s_quality">
                <TableCell className={classes.descriptionCol} component="th" scope="row">
                    Player Quality
                </TableCell>
                <TableCell>
                    <FormControl fullWidth>
                        <Select value={playerQuality || prefPlayerQuality} onChange={handleChange}>
                            <MenuItem value={quality_mp3_max}>Maximum (320)</MenuItem>
                            <MenuItem value={quality_mp3_med}>Medium (128)</MenuItem>
                            <MenuItem value={quality_mp3_trash}>Trash (8)</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
            </TableRow>
        );
    }, [handleChange, playerQuality, prefPlayerQuality, classes.descriptionCol]);

    const renderSettingsAddToken = React.useCallback(() => {
        return (
            <TableRow key="s_add_token">
                <TableCell className={classes.descriptionCol} component="th" scope="row">
                    Add Voucher
                </TableCell>
                <TableCell>
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                className={classes.newVoucherInput}
                                value={addingVoucher}
                                id="add-voucher"
                                size="small"
                                fullWidth
                                onChange={handleVoucherChange}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                className={classes.newVoucherButton}
                                variant="contained"
                                onClick={() => {
                                    addNewVoucher();
                                }}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </TableCell>
            </TableRow>
        );
    }, [
        addingVoucher,
        addNewVoucher,
        handleVoucherChange,
        classes.descriptionCol,
        classes.newVoucherInput,
        classes.newVoucherButton,
    ]);

    const renderSettingsTokens = React.useCallback(() => {
        return (
            <TableRow key="s_tokens">
                <TableCell className={classes.descriptionCol} component="th" scope="row">
                    Vouchers
                </TableCell>
                <TableCell>
                    <Grid container spacing={2} alignItems="center">
                        {prefVoucherTokens.map((token, index) => {
                            return (
                                <Grid key={`token-${index}`} item xs={checkViewportSmallSize(viewport_width) ? 6 : 3}>
                                    <Chip className={classes.voucherItems} label={token} variant="outlined" />
                                </Grid>
                            );
                        })}
                    </Grid>
                </TableCell>
            </TableRow>
        );
    }, [viewport_width, prefVoucherTokens, classes.voucherItems, classes.descriptionCol]);

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
                                {renderSettingsAddToken()}
                                {renderSettingsTokens()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export const Settings = React.memo(SettingsComponent);
