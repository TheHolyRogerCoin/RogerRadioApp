import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import classNames from 'classnames';
import * as React from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { useHideSplash } from '../../hooks/useHideSplash';
import { useWebsocketsConnectFetch } from '../../hooks/useWebsocketsConnectFetch';

declare module '@mui/styles' {
    interface DefaultTheme extends Theme {}
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        success: true;
        failure: true;
    }
}

const drawerWidth = 240;

const colourActivePri = '#fd0000';
const colourActiveSec = '#ac0000';
const colourBarMax = '#ad0000';
const colourBarMin = '#930000';
const colourBarBg = '#4b0000';
const colourHoverTop = '#ac0000';
const colourHoverBottom = '#780000';
const colourNavButton = '#ac0000';
const colourSuccessPri = '#1ed826';
const colourSuccessSec = '#077d0c';
const colourSuccessHovPri = '#078f0d';
const colourSuccessHovSec = '#077d0c';
const colourFailurePri = '#d50000';
const colourFailureSec = '#6c0303';
const colourFailureHovPri = '#ac0000';
const colourFailureHovSec = '#780000';

const mainTheme = createTheme({
    palette: {
        primary: {
            main: colourActivePri,
            dark: colourActiveSec,
        },
        background: {
            paper: 'var(--body-background-color)',
        },
        mode: 'dark',
    },
    components: {
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    padding: '6px 4px 4px',
                    minWidth: '50px',
                    '& .MuiSvgIcon-root': {
                        fill: `${colourNavButton} !important`,
                    },
                    '&.Mui-selected': {
                        justifyContent: 'start',
                        paddingTop: '0px',
                        '& .MuiSvgIcon-root': {
                            fill: `${colourActivePri} !important`,
                        },
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '4px 8px',
                },
                stickyHeader: {
                    backgroundColor: 'var(--body-background-color)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    background: `linear-gradient(0deg, ${colourActiveSec} 0%, ${colourActivePri} 100%);`,
                    '&:hover': {
                        background: `linear-gradient(0deg, ${colourHoverBottom} 0%, ${colourHoverTop} 100%);`,
                    },
                    '@media (hover: none)': {
                        '&:hover': {
                            background: `linear-gradient(0deg, ${colourHoverBottom} 0%, ${colourHoverTop} 100%);`,
                        },
                    },
                },
                contained: {
                    color: '#fff',
                    marginLeft: '6px',
                    marginRight: '6px',
                    paddingLeft: '22px',
                    paddingRight: '22px',
                },
            },
            variants: [
                {
                    props: { variant: 'success' },
                    style: {
                        background: `linear-gradient(0deg, ${colourSuccessSec} 0%, ${colourSuccessPri} 100%);`,
                        '&:hover': {
                            background: `linear-gradient(0deg, ${colourSuccessHovSec} 0%, ${colourSuccessHovPri} 100%);`,
                        },
                        '@media (hover: none)': {
                            '&:hover': {
                                background: `linear-gradient(0deg, ${colourSuccessHovSec} 0%, ${colourSuccessHovPri} 100%);`,
                            },
                        },
                    },
                },
                {
                    props: { variant: 'failure' },
                    style: {
                        background: `linear-gradient(0deg, ${colourFailureSec} 0%, ${colourFailurePri} 100%);`,
                        '&:hover': {
                            background: `linear-gradient(0deg, ${colourFailureHovSec} 0%, ${colourFailureHovPri} 100%);`,
                        },
                        '@media (hover: none)': {
                            '&:hover': {
                                background: `linear-gradient(0deg, ${colourFailureHovSec} 0%, ${colourFailureHovPri} 100%);`,
                            },
                        },
                    },
                },
            ],
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: '8px',
                },
                colorPrimary: {
                    backgroundColor: colourBarBg,
                },
                barColorPrimary: {
                    background: `linear-gradient(90deg, ${colourBarMin} 0%, ${colourBarMax} 98%, ${colourActivePri} 100%);`,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: '#fff',
                },
                input: {
                    color: '#fff',
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    color: '#fff',
                },
                formControl: {
                    color: '#fff',
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#000',
                    minWidth: 35,
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: '#000',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'var(--body-background-color)',
                    color: '#fff',
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    color: '#fff',
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'var(--header-background-color)',
                    paddingLeft: 'calc(var(--gap) * 2)',
                    paddingRight: 'calc(var(--gap) * 2)',
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    minHeight: 30,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    padding: '6px 6px',
                    minHeight: 30,
                    minWidth: '80px !important',
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: colourActivePri,
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                colorAction: {
                    color: '#000',
                },
                root: {
                    fill: colourActivePri,
                    fontSize: '2.2rem',
                },
            },
        },
    },
});

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em',
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: `${colourActivePri}1a`,
        },
        html: {
            'scrollbar-color': `${colourActivePri}1a`,
            'scrollbar-width': 'thin',
        },
    },
    root: {
        backgroundColor: 'var(--main-background-color)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        color: '#fff',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        height: 'calc(100% - 50px)',
        overflowY: 'scroll',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth - 16,
    },
}));

interface OwnProps {
    children: React.ReactNode;
}

const LayoutWrapComponent: React.FC<OwnProps> = ({ children }) => {
    const classes = useStyles();
    const open = false;

    useHideSplash();
    useWebsocketsConnectFetch();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {children}
            </main>
            <NavBar />
        </div>
    );
};

const LayoutWrap = React.memo(LayoutWrapComponent);

const LayoutComponent: React.FC<OwnProps> = ({ children }) => {
    return (
        <ThemeProvider theme={mainTheme}>
            <LayoutWrap>{children}</LayoutWrap>
        </ThemeProvider>
    );
};

export const Layout = React.memo(LayoutComponent);
