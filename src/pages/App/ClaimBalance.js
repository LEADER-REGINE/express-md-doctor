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

    const [payload, setPayload] = useState({
        gcashNum: "",
        gcashName: "",
    });
    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };

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
        if (!payload.gcashNum || !payload.gcashName) {
            alert("Please fill out all the fields");
        } else {
            userProfile.profile.map((data) => {
                if (data.credits < 1) {
                    alert('you have no claimable balance');
                } else {
                    var userRef = db.collection("doctors").doc(data.uid);
                    var userclaimRef = db.collection("doctors").doc(data.uid).collection("PreviousClaims").doc();
                    var globalRef = db.collection("claimCredit").doc(localStorage.getItem("uid"));

                    var batch = db.batch()
                    batch.set(globalRef, {
                        status: "Pending",
                        amount: data.credits,
                        timestamp: new Date(),
                        uid: data.uid,
                        gcashNum: payload.gcashNum,
                        gcashName: payload.gcashName,
                        fullname: data.lastname + ", " + data.firstname + " " + data.middleInitials
                    })
                    batch.set(userclaimRef, {
                        status: "Pending",
                        amount: data.credits,
                        timestamp: new Date(),
                        uid: data.uid,
                        gcashNum: payload.gcashNum,
                        gcashName: payload.gcashName,
                        fullname: data.lastname + ", " + data.firstname + " " + data.middleInitials
                    })
                    batch.update(userRef, {
                        credits: parseInt(0),
                    })

                    batch.commit().then((doc) => {
                        history.push(`/success/${"claimpending"}`);
                    })

                }

            })
        }

    }

    return (
        <Box>
            <Typography>Claim Balance</Typography>
            {userProfile.profile.map((data) => {
                return (
                    <Box>
                        <Typography>Claimable Balance: PHP {data.credits}</Typography>
                        <TextField placeholder="GCash Number"
                            onChange={userInput("gcashNum")}
                            inputProps={{ maxLength: 11, minLength: 11 }}
                        />
                        <TextField placeholder="GCash Account Name"
                            onChange={userInput("gcashName")}
                        />
                        <Button onClick={() => sendClaim()}>Claim</Button>
                    </Box>
                )
            })}
        </Box>
    );
}
