import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import classNames from 'classnames';
import * as React from 'react';
import { NavBar } from '../../components/NavBar/NavBar';
import { useHideSplash } from '../../hooks/useHideSplash';

declare module '@mui/styles' {
    interface DefaultTheme extends Theme {}
}

const drawerWidth = 240;

const colourActive = '#fd7604';
const colourHover = '#ce5e00';

const mainTheme = createTheme({
    palette: {
        primary: {
            main: colourActive,
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
                    padding: '6px 12px 4px',
                    '&.Mui-selected': {
                        paddingTop: '0px',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '6px 16px',
                },
                stickyHeader: {
                    backgroundColor: 'var(--body-background-color)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    background: colourActive,
                    '&:hover': {
                        backgroundColor: colourHover,
                    },
                    '@media (hover: none)': {
                        '&:hover': {
                            backgroundColor: `${colourHover} !important`,
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
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: '8px',
                },
                colorPrimary: {
                    backgroundColor: colourHover,
                },
                barColorPrimary: {
                    backgroundColor: colourActive,
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
                    color: colourActive,
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                colorAction: {
                    color: '#000',
                },
                root: {
                    fill: colourActive,
                    fontSize: '2.2rem',
                },
            },
        },
    },
});

const useStyles = makeStyles((theme) => ({
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
