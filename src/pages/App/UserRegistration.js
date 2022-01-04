import { Typography, Box, Container, TextField, Button, FormGroup, FormControl, FormHelperText, Avatar, Select, InputLabel, MenuItem } from '@mui/material'
import firebase from '../../config/firebase';
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import {
    getAuth
} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

import './Registration.css';

function UserRegistration() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);
    const db = firebase.firestore();
    const history = useHistory();
    const [payload, setPayload] = useState({
        fullname: "",
        email: "",
        gender: "",
        uid: localStorage.getItem("uid"),
        photoURL: localStorage.getItem("photoURL"),
        phoneNumber: "",
        houseNum: "",
        municipality: "",
        barangay: "",
    });

    getAuth().onAuthStateChanged(function (user) {
        var userRef = db.collection("users").doc(localStorage.getItem('uid'));
        userRef.get().then((doc) => {
            if (doc.exists) {
                alert("you have already completed your profile. Please go to settings if you want to edit.");
                history.push("/");
            }
        })
    });
    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };
    const completeProfile = (e) => {
        if (
            !payload.fullname ||
            !payload.email ||
            !payload.gender ||
            !payload.phoneNumber ||
            !payload.houseNum ||
            !payload.municipality ||
            !payload.barangay
        ) {
            alert("Please fill out all of the fields");
            console.log(payload);
        } else {
            db.collection("users")
                .doc(payload.uid)
                .set({
                    fullname: payload.fullname,
                    email: payload.email,
                    gender: payload.gender,
                    uid: payload.uid,
                    photoURL: payload.photoURL,
                    phoneNumber: payload.phoneNumber,
                    location: payload.houseNum + " " + payload.barangay + ", " + payload.municipality,
                })
                .then((docRef) => { history.push("/"); })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    };
    return (
        <Box className='base'>
            <Container className='registerContainer'>
                <Typography variant="h4">Complete Your Profile</Typography>
                <Box className='formContainer'>
                    <Box className='imgContainer'>
                        <img className='usrImg' alt='profileImg' src={localStorage.getItem("photoURL")} />
                    </Box>
                    <FormGroup>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
                            <TextField
                                required
                                id="filled-required"
                                label="Fullname"
                                variant="filled"
                                onChange={userInput("fullname")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
                            <InputLabel >Gender</InputLabel>
                            <Select
                                id='gender'
                                label="Gender *"
                                value={'Male'}
                                onChange={userInput("gender")}
                                value={payload.gender}
                            >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Others'}>Others/Prefer not to say</MenuItem>
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
                            <TextField
                                required
                                id="filled-required"
                                label="E-mail"
                                variant="filled"
                                onChange={userInput("email")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
                            <TextField
                                required
                                id="filled-required"
                                label="Phone Number"
                                variant="filled"
                                onChange={userInput("phoneNumber")}
                                value={payload.phoneNumber}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
                            <TextField
                                required
                                id="filled-required"
                                label="House # and Street"
                                variant="filled"
                                onChange={userInput("houseNum")}
                                value={payload.houseNum}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
                            <TextField
                                required
                                id="filled-required"
                                label="Barangay"
                                variant="filled"
                                onChange={userInput("barangay")}
                                value={payload.barangay}
                            />
                        </FormControl>

                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
                            <InputLabel >Municipality</InputLabel>
                            <Select
                                id='Municipality'
                                label="Municipality *"
                                value={'Bustos'}
                                onChange={userInput("municipality")}
                                value={payload.municipality}
                            >
                                <MenuItem value={'Bustos'}>Bustos</MenuItem>
                                <MenuItem value={'Baliuag'}>Baliuag</MenuItem>
                            </Select>
                            <FormHelperText>*Required. Bustos and Baliuag only.</FormHelperText>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                            <Button onClick={() => completeProfile()} variant='outlined'>Complete</Button>
                            <FormHelperText>By clicking complete, you agree to the Privacy Policy.</FormHelperText>
                        </FormControl>

                    </FormGroup>
                </Box>
            </Container>
        </Box>
    )
}

export default withRouter(UserRegistration);