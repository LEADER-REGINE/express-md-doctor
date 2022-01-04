import React, { useState } from 'react'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import firebase from "../../config/firebase";
import { useHistory, NavLink, withRouter } from "react-router-dom";

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = firebase.firestore();



function AccoundModal() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [usrExists, setusrExists] = useState(false);
    const history = useHistory();

    function GoogleLogin() {
        setAnchorElUser(null);
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                var userRef = db.collection("users").doc(user.uid);
                userRef.get().then((doc) => {
                    if (!doc.exists) {
                        history.push("/register");
                    }
                })


                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    getAuth().onAuthStateChanged(function (user) {
        setIsLoggedIn(user);
        if (user !== null && localStorage.getItem("uid") === null) {
            localStorage.setItem("email", user.email);
            localStorage.setItem("photoURL", user.photoURL);
            localStorage.setItem("uid", user.uid);
            localStorage.setItem("displayName", user.displayName);
        }
    });


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function logout() {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("email");
                localStorage.removeItem("photoURL");
                localStorage.removeItem("uid");
                localStorage.removeItem("displayName");
            })
            .catch((error) => {
                // An error happened.
                alert(error);
            });
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            {isLoggedin ? (
                <Box >
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={localStorage.getItem("displayName")} src={localStorage.getItem("photoURL")} />
                    </IconButton>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <NavLink to='/profile'>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                        </NavLink>
                        <MenuItem onClick={() => logout()}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            ) : (
                <Box >
                    <Tooltip title="Login">
                        <IconButton onClick={() => GoogleLogin()} sx={{ p: 0 }}>
                            <Avatar alt="Account Login" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

        </Box>
    )
}

export default withRouter(AccoundModal);