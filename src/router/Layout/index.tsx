import { CssBaseline, makeStyles } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames';
import * as React from 'react';

const drawerWidth = 240;

const colourActive = '#fd7604';
const colourHover = '#ce5e00';

const mainTheme = createTheme({
    palette: {
        primary: {
            main: 'rgb(245, 233, 56)',
        },
        background: {
            paper: 'var(--body-background-color)',
        },
        type: 'dark',
    },
    overrides: {
        MuiTableCell: {
            root: {
                padding: '6px 16px',
            },
            stickyHeader: {
                backgroundColor: 'var(--body-background-color)',
            },
        },
        MuiButton: {
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
            text: {
                marginLeft: '6px',
                marginRight: '6px',
                paddingLeft: '22px',
                paddingRight: '22px',
            },
        },
        MuiInputBase: {
            root: {
                color: '#fff',
            },
            input: {
                color: '#fff',
            },
        },
        MuiInput: {
            root: {
                color: '#fff',
            },
            formControl: {
                color: '#fff',
            },
        },
        MuiListItemIcon: {
            root: {
                color: '#000',
                minWidth: 35,
            },
        },
        MuiListItemText: {
            root: {
                color: '#000',
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: 'var(--body-background-color)',
                color: '#fff',
            },
        },
        MuiTablePagination: {
            root: {
                color: '#fff',
            },
        },
        MuiPopover: {
            paper: {
                backgroundColor: 'var(--header-background-color)',
                paddingLeft: 'calc(var(--gap) * 2)',
                paddingRight: 'calc(var(--gap) * 2)',
            },
        },
        MuiTab: {
            root: {
                minWidth: '120px !important',
            },
        },
        MuiSlider: {
            root: {
                color: colourActive,
            },
        },
        MuiSvgIcon: {
            colorAction: {
                color: '#000',
            },
            root: {
                fill: colourActive,
                fontSize: '2.2rem',
            },
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'var(--main-background-color)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        color: '#fff',
    },
    toolbar: {
        // display: 'flex',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),

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
const LayoutComponent: React.FC<OwnProps> = ({ children }) => {
    const classes = useStyles();
    const open = false;
    return (
        <ThemeProvider theme={mainTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        </ThemeProvider>
    );
};

export const Layout = React.memo(LayoutComponent);
