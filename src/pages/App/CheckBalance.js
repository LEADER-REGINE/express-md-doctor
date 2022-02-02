import { Avatar, Rating, Typography, Box, Container, BottomNavigation, BottomNavigationAction, Paper, Button } from '@mui/material'
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import firebase from '../../config/firebase';
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Link } from 'react-router-dom';
import '../App/DocProfile.css'

export default function CheckBalance() {
    const [value, setValue] = useState(0);

    const db = firebase.firestore();
    const [doctorProfile, setdoctorProfile] = useState({
        profile: [],
    });

    const fetchData = async () => {
        let isMounted = true
        const docRef = await db.collection("doctors").doc(localStorage.getItem("uid"));
        let docProfile = [];
        docRef.get().then((doc) => {
            docProfile.push(doc.data());
            setdoctorProfile({ profile: docProfile });
        });
        isMounted = false
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box className='base'>
            <Container className='container'>
                <Box>
                    {doctorProfile &&
                        doctorProfile.profile.map((docProfile) => {
                            return (
                                <Box className="docProfileBox" key={docProfile.uid}>
                                    <Paper>
                                        <Typography variant="h6">
                                            Claimable Balance
                                        </Typography>
                                        <Typography variant="h5">PHP {docProfile.credits}</Typography>
                                        <Button variant="outlined">Claim</Button>
                                    </Paper>
                                </Box>
                            );
                        })}
                </Box>

            </Container >

        </Box >
    )
}
