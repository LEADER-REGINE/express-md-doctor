import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import { withRouter, useHistory } from 'react-router-dom';

export default function ClaimBalance() {

    const history = useHistory();
    const db = firebase.firestore();
    const [userProfile, setuserProfile] = useState({
        profile: [],
    })

    const fetchList = async () => {
        const userRef = db.collection('doctors').doc(localStorage.getItem("uid"));
        let usrProfile = [];
        userRef.get().then(doc => {
            usrProfile.push(doc.data());
            setuserProfile({ profile: usrProfile });
        })
    }

    useEffect(() => {
        fetchList();
    }, []);

    function sendClaim() {
        /* userProfile.profile.map((data) => {
            var globalRef = db.collection("claimCredit").doc(data.uid);
            var batch = db.batch()
            batch.set(globalRef, {
                status: "Pending",
                balance: data.credits,
                timestamp: new Date(),
                uid: data.uid,
            })

            batch.commit().then((doc)=>{

            })
        }) */
    }

    return (
        <Box>
            <Typography>Claim Balance</Typography>
            {userProfile.profile.map((data) => {
                return (
                    <Box>
                        <Typography>Claimable Balance: PHP {data.credits}</Typography>
                        <TextField placeholder="GCash Number" />
                        <Button onClick={() => sendClaim()}>Claim</Button>
                    </Box>
                )
            })}
        </Box>
    );
}
