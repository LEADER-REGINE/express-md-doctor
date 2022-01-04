import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Paper, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import EventIcon from '@mui/icons-material/Event';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HelpIcon from '@mui/icons-material/Help';
import PeopleIcon from '@mui/icons-material/People';
import firebase from '../../config/firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    getAuth,
    signOut,
} from "firebase/auth";
import './Profile.css';
import MobileProfileContainer from '../../components/appcomponents/MobileProfileContainer';
import WebProfileContainer from '../../components/appcomponents/WebProfileContainer';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

const auth = getAuth();
const user = auth.currentUser;

function LoggedIn() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Box>
            <Box className='mobileContainer'>
                <MobileProfileContainer />
            </Box>
            <Box className='webContainer'>
                <WebProfileContainer />
            </Box>
        </Box>

    );
}

function NotLoggedIn() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    return (
        <Box>
            <Typography>
                Please Log in to view your profile.
            </Typography>
        </Box>
    );
}

export default function Profile() {
    const [isLoggedin, setIsLoggedIn] = useState(false);
    getAuth().onAuthStateChanged(function (user) {
        setIsLoggedIn(user);
    });

    return (
        <Box className='base'>
            <Box>
                {isLoggedin ? <LoggedIn /> : <NotLoggedIn />}
            </Box>
        </Box >
    )
}
