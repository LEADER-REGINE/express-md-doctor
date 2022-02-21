import { Box, Button, TextField, Typography , Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import { withRouter, useHistory } from 'react-router-dom';
import balancepic from "../../assets/balance.png"

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

                    const secondsSinceEpoch = Math.round(Date.now() / 1000)
                    var docuID = secondsSinceEpoch.toString();
                    console.log(secondsSinceEpoch);
                    const doctorRef = db.collection("doctors").doc(localStorage.getItem("uid"));
                    const globalRef = db.collection("creditClaims");
                    const docuRef = db.collection("doctors").doc(localStorage.getItem("uid")).collection("prevClaims");

                    globalRef.doc(docuID).set({
                        status: "Pending",
                        amount: data.credits,
                        timestamp: new Date(),
                        uid: data.uid,
                        gcashNum: payload.gcashNum,
                        gcashName: payload.gcashName,
                        fullname: data.lastname + ", " + data.firstname + " " + data.middleInitials,
                        docID: docuID,
                    })
                        .then(() => {
                            docuRef.doc(docuID).set({
                                status: "Pending",
                                amount: data.credits,
                                timestamp: new Date(),
                                uid: data.uid,
                                gcashNum: payload.gcashNum,
                                gcashName: payload.gcashName,
                                fullname: data.lastname + ", " + data.firstname + " " + data.middleInitials,
                                docID: docuID,
                            })
                                .then(() => {
                                    doctorRef
                                        .update({
                                            credits: parseInt(0),
                                        })
                                        .then((doc7) => {
                                            alert("Success");
                                            window.location.reload();
                                        })
                                })
                        })

                }

            })
        }

    }

    const style = {
        picCon : {
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            marginTop : "20px"
        },
        banner : {
            width : "80px",
        },
        claim : {
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            marginTop : "50px",
            padding : "40px 20px",
            marginLeft : "20px",
            marginRight : "20px",
            flexDirection : "column",
            border : "2px solid #7EB6BC"
        

        },
        label : {
            fontSize : "24px"
        },
        sublabel : {
            fontSize : "14px"
        },
        inputField : {
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            marginTop : "50px",
            marginLeft : "20px",
            marginRight : "20px",
            flexDirection : "column",
            marginBottom : "100px"
        },
        textInput: {
            [`& fieldset`]: {
              borderRadius: 4,
            },
            minWidth : "250px",
            marginLeft : "20px",
            marginRight : "20px",
            marginBottom : "20px"
        }
    }

    return (
        <Box>
            {userProfile.profile.map((data) => {
                return (
                    <Box>
                        <Box sx = {style.picCon}>
                        <Box component = "img" src = {balancepic} sx = {style.banner}/>
                        </Box>
                        <Paper sx = {style.claim} variant = "outlined">
                        <Typography sx = {style.label}>PHP {data.credits}</Typography>
                        <Typography sx = {style.sublabel}>AVAILABLE BALANCE</Typography>
                        </Paper>

                        <Box sx = {style.inputField}>
                        <TextField sx = {style.textInput} placeholder="GCash Number"
                            onChange={userInput("gcashNum")}
                            type = "tel"
                            inputProps={{ maxLength: 11, minLength: 11 }}
                        />
                        <TextField sx = {style.textInput} placeholder="GCash Account Name"
                            onChange={userInput("gcashName")}
                        />
                        <Button onClick={() => sendClaim()}>Claim</Button>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    );
}
