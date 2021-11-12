import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { TabPanel } from '../../components/TabPanel/TabPanel';
import { a11yProps } from '../../helpers/a11yProps';
import { useFetchScheduleListUpdateInterval } from '../../hooks/useFetchScheduleListUpdateInterval';
import { selectRadioScheduleList } from '../../modules/radioStatus';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    schedule: {
        position: 'relative',
    },
    title: {
        textAlign: 'center',
        position: 'relative',
    },
    slItems: {
        fontSize: '0.75em',
        marginTop: '0px !important',
    },
    slItem: {
        position: 'relative',
    },
    slItemActive: {
        color: theme.palette.primary.main,
        border: `solid ${theme.palette.primary.main} 0px`,
        borderBottomWidth: '1px',
        borderTopWidth: '1px',
        fontWeight: 900,
        marginBottom: `${theme.spacing(0)} !important`,
        marginTop: `${theme.spacing(0.5)} !important`,
        paddingBottom: `${theme.spacing(1)} !important`,
        paddingTop: `${theme.spacing(1)} !important`,
        position: 'relative',
    },
}));

const ScheduleListComp: React.FC = () => {
    const classes = useStyles();
    const [activeTab, setActiveTab] = React.useState(0);

    useFetchScheduleListUpdateInterval();

    // const [curTime, setCurTime] = React.useState(Math.floor(Date.now() / 1000));

    const sched = useSelector(selectRadioScheduleList);

    const renderPlaylistItem = React.useCallback(
        (itm, index: number) => {
            const clsNm = itm.Active ? classes.slItemActive : classes.slItem;
            return (
                <React.Fragment key={`${index}`}>
                    <Grid className={clsNm} key={`${index}-day`} item xs={3}>
                        {itm.DayName}
                    </Grid>
                    <Grid className={clsNm} key={`${index}-tim`} item xs={1.5}>
                        {itm.BlockTime}
                    </Grid>
                    <Grid className={clsNm} key={`${index}-nam`} item xs={7.5}>
                        {itm.BlockName}
                    </Grid>
                </React.Fragment>
            );
        },
        [classes.slItemActive, classes.slItem]
    );

    const blockGroups = React.useCallback(() => {
        return sched.reduce((dayNames: string[], itm) => {
            if (!dayNames.includes(itm.DayName)) {
                dayNames.push(itm.DayName);
            }

            return dayNames;
        }, []);
    }, [sched]);

    const blockTabs = React.useCallback(() => {
        return blockGroups().map((dayName, index) => {
            return <Tab key={`${index}-tbCmp`} label={dayName} {...a11yProps(index)} />;
        });
    }, [blockGroups]);

    const tabPanels = React.useCallback(() => {
        return blockGroups().map((dayName, index) => {
            return (
                <TabPanel key={`${index}-tbPnl`} value={activeTab} index={index}>
                    <Grid className={classes.slItems} container spacing={1} alignItems="center">
                        {sched.map((itm, itmIdx) => {
                            window.console.log(dayName);
                            if (itm.DayName === dayName) {
                                return renderPlaylistItem(itm, itmIdx);
                            }
                            return null;
                        })}
                    </Grid>
                </TabPanel>
            );
        });
    }, [classes.slItems, blockGroups, activeTab, renderPlaylistItem, sched]);

    const handleChange = React.useCallback((event, newVal: number) => {
        setActiveTab(newVal);
    }, []);

    window.console.log(blockGroups());

    return (
        <div className={classes.schedule}>
            <Grid container alignItems="center">
                <Grid item xs={12}>
                    <span className={classes.title}>Planned Rogerings (GMT)...</span>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            variant="scrollable"
                            scrollButtons="auto"
                            value={activeTab}
                            onChange={handleChange}
                            aria-label="Schedule Days"
                        >
                            {blockTabs()}
                        </Tabs>
                    </Box>
                    {tabPanels()}
                </Grid>
            </Grid>
        </div>
    );
};

export const ScheduleListComponent = React.memo(ScheduleListComp);
