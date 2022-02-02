import React, { useState } from 'react'
import { Tooltip, Avatar, MenuItem, Menu, IconButton, Typography, Box } from '@mui/material';
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
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

    const [userProfile, setuserProfile] = useState({
        profile: [],
    })

    function GoogleLogin() {
        setAnchorElUser(null);
        history.push("/login");
    }

    getAuth().onAuthStateChanged(function (user) {
        setIsLoggedIn(user);
        if (user !== null && localStorage.getItem("uid") === null) {
            localStorage.setItem("uid", user.uid);
            const fetchList = async () => {
                const userRef = db.collection('users').doc(localStorage.getItem("uid"));
                let usrProfile = [];
                userRef.get().then(doc => {
                    usrProfile.push(doc.data());
                    setuserProfile({ profile: usrProfile });
                })
            }
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
                localStorage.removeItem("uid");
                history.push("/");
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
                    {
                        userProfile && userProfile.profile.map((userProfile) => {
                            return (
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} key={userProfile.uid}>
                                    <Avatar alt="User Image" src={userProfile.photoURL} />
                                </IconButton>
                            )
                        })
                    }
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
                    </Tooltip>
                </Box>
            )}

        </Box>
    )
}

export default withRouter(AccoundModal);