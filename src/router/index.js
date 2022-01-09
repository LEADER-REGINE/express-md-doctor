import '../App.css';

import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';
import App from '../pages/App';
import Welcome from '../pages/Welcome';
import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import Login from '../pages/App/Login';
import Nav from '../components/appcomponents/Nav';
import PrivateRoute from '../utils/PrivateRoute';
import PublicRoute from '../utils/PublicRoute';
import firebase from '../config/firebase';
import ViewRequest from '../pages/App/ViewRequest'
import Profile from '../pages/App/Profile';
import EditRequest from '../pages/App/EditRequest';
import IsSuccessful from "../pages/App/IsSuccessful";
import IsNotSuccessful from "../pages/App/IsNotSuccessful";

export default function RouterComponent() {
    const ui = useSelector((state) => state.ui);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#2D539E',
                dark: '#84A0C6',
                light: '#2D539E',
            },
            secondary: {
                main: '#80b2bd',
            },
            text: {
                primary: '#fff',
                secondary: '#2D539E',
                disabled: '#ADB1C4',
            },
            error: {
                main: '#FC7374',
            },
            background: {
                paper: '#1d222e',
                default: '#161821',
            },
        },

        typography: {
            fontFamily: 'Roboto',
        },
    })

    const lightTheme = createTheme({
        palette: {
            primary: {
                main: '#16C2D5',
            },
            secondary: {
                main: '#16C2D5',
            },
            text: {
                primary: '#33374C',
                secondary: '#2D539E',
                disabled: '#ADB1C4',
            },
            error: {
                main: '#FC7374',
            },
            background: {
                paper: '#f9fbfd',
                default: '#fcfcfc',
            },
        },

        typography: {
            fontFamily: 'Roboto',
        },
    })
    const [value, setValue] = useState(0);

    const [values, setValues] = useState({
        isAuthenticated: false,
    });
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setValues({ isAuthenticated: true });

            } else {
                setValues({ isAuthenticated: false });
            }
        });
    }, []);

    return (
        <ThemeProvider theme={ui.isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Router>
                <Switch >
                    <PublicRoute
                        isAuthenticated={values.isAuthenticated}
                        restricted={true}
                        component={Login}
                        path="/login"
                        exact />
                    <PublicRoute
                        isAuthenticated={values.isAuthenticated}
                        restricted={false}
                        component={Welcome}
                        path="/"
                        exact />
                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={App}
                        path="/dashboard"
                        exact />

                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={Profile}
                        path="/profile"
                        exact />
                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={ViewRequest}
                        path="/view/:id"
                        exact />
                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={EditRequest}
                        path="/view/:id/edit"
                        exact />
                    <PrivateRoute
                        exact
                        isAuthenticated={values.isAuthenticated}
                        component={IsSuccessful}
                        path="/success" />
                    <PrivateRoute
                        exact
                        isAuthenticated={values.isAuthenticated}
                        component={IsNotSuccessful}
                        path="/sorry" />
                </Switch>
                <Box>
                    <Paper elevation="8" className="bottomNav">
                        <BottomNavigation

                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            className="bottomNavContainer"
                        >
                            <NavLink to='/dashboard'>
                                <BottomNavigationAction label="Home" icon={<HomeIcon color="secondary" />} />
                            </NavLink>
                            <NavLink to='/profile'>
                                <BottomNavigationAction label="Profile" icon={<AccountCircleIcon color="secondary" />} />
                            </NavLink>
                        </BottomNavigation>
                    </Paper>
                </Box>
            </Router>

        </ThemeProvider>
    );
}

