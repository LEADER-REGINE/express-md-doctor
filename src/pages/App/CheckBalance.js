import { Avatar, Rating, Typography, Box, Container, BottomNavigation, BottomNavigationAction, Paper, Button } from '@mui/material'
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import firebase from '../../config/firebase';
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Link, useHistory } from 'react-router-dom';
import '../App/DocProfile.css'
import PreviousClaimsTable from '../../components/appcomponents/PreviousClaimsTable';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

export default function CheckBalance() {
    const [value, setValue] = useState(0);

    const history = useHistory();
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
        <Box >
            <Box sx={{ p: "20px 20px 0px 20px" }}>
                {doctorProfile &&
                    doctorProfile.profile.map((docProfile) => {
                        return (
                            <Card sx={{ width: '100%', p: "20px" }} key={docProfile.uid}>

                                <Typography variant="h6">
                                    Claimable Balance
                                </Typography>
                                <Grid
                                    display="flex"
                                    direction="column"
                                    justifyConten="center"
                                    alignItems="center"
                                >
                                    <Typography variant="h5">PHP {docProfile.credits}</Typography>

                                    <Button variant="outlined" onClick={() => history.push("/claim")}>Claim</Button>
                                </Grid>


                            </Card>
                        );
                    })}
            </Box>




            <PreviousClaimsTable sx={{ p: "20px 20px 0px 20px" }} />

        </Box >

    )
}
