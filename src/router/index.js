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
import Ratings from '../pages/App/Ratings';
import EditRequest from '../pages/App/EditRequest';
import Feed from '../pages/App/Feed';
import EditProfile from '../pages/App/EditProfile';
import IsSuccessful from "../pages/App/IsSuccessful";
import IsNotSuccessful from "../pages/App/IsNotSuccessful";
import DeclineRequest from '../pages/App/DeclineRequest';
import DynamicFeedRoundedIcon from '@mui/icons-material/DynamicFeedRounded';
import Register from '../pages/App/UserRegistration';
import ViewArchive from '../pages/App/ViewArchive';
import TransactionHistory from '../components/appcomponents/TransactionHistory';
import CheckBalance from '../pages/App/CheckBalance';
import ClaimBalance from '../pages/App/ClaimBalance';

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
                <Nav />
                <Switch >
                    <PublicRoute
                        isAuthenticated={values.isAuthenticated}
                        restricted={true}
                        component={Login}
                        path="/login"
                        exact />
                    <PublicRoute
                        isAuthenticated={values.isAuthenticated}
                        restricted={true}
                        component={Register}
                        path="/register"
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
                        component={CheckBalance}
                        path="/balance"
                        exact />
                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={Feed}
                        path="/feed"
                        exact />

                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={ClaimBalance}
                        path="/claim"
                        exact />

                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={Profile}
                        path="/profile"
                        exact />
                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={Ratings}
                        path="/ratings"
                        exact />
                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={TransactionHistory}
                        path="/history"
                        exact />
                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={ViewRequest}
                        path="/view/:id"
                        exact />
                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={ViewArchive}
                        path="/archive/:id/view"
                        exact />
                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={EditRequest}
                        path="/view/:id/edit"
                        exact />
                    <PrivateRoute
                        isAuthenticated={values.isAuthenticated}
                        component={DeclineRequest}
                        path="/view/:id/decline"
                        exact />
                    <PrivateRoute
                        exact
                        isAuthenticated={values.isAuthenticated}
                        component={IsSuccessful}
                        path="/success/:status" />
                    <PrivateRoute
                        exact
                        isAuthenticated={values.isAuthenticated}
                        component={IsNotSuccessful}
                        path="/sorry" />

                    <PrivateRoute exact isAuthenticated={values.isAuthenticated} component={EditProfile} path="/editprofile" />
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
                            <NavLink to='/feed'>
                                <BottomNavigationAction label="Feed" icon={<DynamicFeedRoundedIcon color="secondary" />} />
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

