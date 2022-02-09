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


    const [fetchPrevClaims, setfetchPrevClaims] = useState({
        claims: [],
    });

    const [prevClaim, setprevClaim] = useState(true);

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

    const fetchPrevious = async () => {
        const userRef = db.collection("doctors").doc(localStorage.getItem("uid")).collection("prevClaims").orderBy("timestamp", "desc").limit(5);
        userRef.onSnapshot((doc) => {
            if (doc.size == 0) {
                // doc.data() will be undefined in this case
                setprevClaim(true);
            } else {
                setprevClaim(false);
                userRef.onSnapshot((doc) => {
                    let getPrevClaim = [];
                    doc.forEach((req) => {
                        getPrevClaim.push(req.data());
                    });
                    setfetchPrevClaims({ claims: getPrevClaim });
                });
            }
        });
    };

    useEffect(() => {
        fetchData();
        fetchPrevious();
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
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Typography variant="h5">PHP {docProfile.credits}</Typography>

                                    <Button variant="outlined" onClick={() => history.push("/claim")}>Claim</Button>
                                </Grid>


                            </Card>
                        );
                    })}
            </Box>

            <Box>
                <Typography variant="h6" sx={{ p: "20px 20px 0px 20px" }}>Previous Claims</Typography>
                <Box sx={{ p: "20px 20px 0px 20px" }}>
                    {fetchPrevClaims.claims.map((data) => {
                        let setTime = data.timestamp.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        let setDate = data.timestamp.toDate().toLocaleDateString('en-US', options);
                        return (
                            <Paper key={data.timestamp} sx={{
                                display: 'flex',
                                direction: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: "10px 20px"
                            }}>
                                <Box>
                                    <Typography variant="h6">
                                        PHP {data.amount}
                                    </Typography>
                                    <Typography>
                                        {data.gcashNum}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" >
                                        {data.status}
                                    </Typography>
                                    <Typography>
                                        {setDate}
                                    </Typography>
                                    {/* <Typography>
                                        {setTime}
                                    </Typography> */}
                                </Box>

                            </Paper>
                        )
                    })

                    }
                </Box>
            </Box>

        </Box >

    )
}
