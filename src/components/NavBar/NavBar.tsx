import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import RadioIcon from '@mui/icons-material/Radio';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SettingsIcon from '@mui/icons-material/Settings';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    mainNav: {
        height: '50px !important',
    },
}));

const NavBarComponent: React.FC = () => {
    const classes = useStyles();

    const [activeTab, setActiveTab] = React.useState(0);

    const handleNav = React.useCallback((event, newVal) => {
        setActiveTab(newVal);
    }, []);

    return (
        <Box>
            <BottomNavigation className={classes.mainNav} value={activeTab} onChange={handleNav}>
                <BottomNavigationAction component={Link} to="/" icon={<RadioIcon />} />
                <BottomNavigationAction component={Link} to="/playlist" icon={<QueueMusicIcon />} />
                <BottomNavigationAction component={Link} to="/recent_requests" icon={<SubscriptionsIcon />} />
                <BottomNavigationAction component={Link} to="/schedule" icon={<EventNoteIcon />} />
                <BottomNavigationAction component={Link} to="/rogers_choice" icon={<LibraryMusicIcon />} />
                <BottomNavigationAction component={Link} to="/settings" icon={<SettingsIcon />} />
            </BottomNavigation>
        </Box>
    );
};

export const NavBar = React.memo(NavBarComponent);
