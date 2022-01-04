import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import firebase from '../../config/firebase';
import {
    getAuth,
    signOut,
} from "firebase/auth";
import '../../pages/App/Profile.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TransactionHistory from '../appcomponents/TransactionHistory';
import Settings from '../appcomponents/Settings';
import EmergencyContact from './HospitalContact';


const auth = getAuth();
const user = auth.currentUser;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function WebProfileContainer() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const db = firebase.firestore();
    const [userProfile, setuserProfile] = useState({
        profile: [],
    })
    const fetchList = async () => {
        const userRef = db.collection('users').doc(localStorage.getItem("uid"));
        let usrProfile = [];
        userRef.get().then(doc => {
            usrProfile.push(doc.data());
            setuserProfile({ profile: usrProfile });
        })
    }
    useEffect(() => {
        fetchList();
    }, []);

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
        <Container>
            <Box className='profileContainer'>
                {
                    userProfile && userProfile.profile.map((userProfile) => {
                        return (
                            <Box className='profileBox'>
                                <Box className='imgBox' key={userProfile.uid}>
                                    <img className='usrImg' alt='user image' src={userProfile.photoURL} />
                                    <Typography variant="subtitle1">{userProfile.fullname}</Typography>
                                    <Button variant='outlined'>Edit Profile</Button>
                                </Box>
                            </Box>
                        )
                    })
                }
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="History" {...a11yProps(0)} />
                            <Tab label="Emergency Numbers" {...a11yProps(1)} />
                            <Tab label="Settings" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <TransactionHistory />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <EmergencyContact />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Settings />
                    </TabPanel>
                </Box>
            </Box>
        </Container>

    )
}
