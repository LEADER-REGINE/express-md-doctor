import { Box, Container, TextField, Button, FormGroup, FormControl, FormHelperText, Avatar, Select, InputLabel, MenuItem, Typography } from '@mui/material'
import firebase from '../../config/firebase';
import React, { useState, useEffect } from 'react';
import { useHistory, withRouter, useLocation } from "react-router-dom";
import {
    getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut
} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";
import { IconButton } from '@mui/material';

import './Registration.css';


const auth = getAuth();


function UserRegistration() {
    const location = useLocation();

    const db = firebase.firestore();
    const store = firebase.storage();
    const history = useHistory();
    const [payload, setPayload] = useState({
        fname: "",
        mname: "",
        lname: "",
        gender: "",
        phoneNumber: "",
        location: "",
        type: "",
        rate: "",
        prcno: "",
        email: "",
    });

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    const [file2, setFile2] = useState(null);
    const [url2, setURL2] = useState("");

    const [file3, setFile3] = useState(null);
    const [url3, setURL3] = useState("");


    function handleChange(e) {
        setFile(e.target.files[0]);
    }
    function handleChange2(e) {
        setFile2(e.target.files[0]);
    }
    function handleChange3(e) {
        setFile3(e.target.files[0]);
    }


    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };
    const completeProfile = (e) => {
        if (
            !payload.fname ||
            !payload.mname ||
            !payload.lname ||
            !payload.email ||
            !payload.gender ||
            !payload.location ||
            !payload.phoneNumber ||
            !payload.type ||
            !payload.prcno ||
            !payload.rate
        ) {
            alert("Please fill out all of the fields");
        } else {
            db.collection("registration")
                .add({
                    fname: payload.fname,
                    lname: payload.lname,
                    mname: payload.mname,
                    email: payload.email,
                    gender: payload.gender,
                    type: payload.type,
                    prcno: payload.prcno,
                    rate: payload.rate,
                    phoneNumber: payload.phoneNumber,
                    location: payload.location,
                })
                .then((docRef) => {
                    localStorage.setItem("documentID", docRef.id);
                    db.collection("registration")
                        .doc(docRef.id)
                        .set({
                            documentID: docRef.id,
                        })
                        .then((doc) => {
                            const ref = store.ref(`/registration/${localStorage.getItem("documentID")}/${file.name}`);
                            const uploadTask = ref.put(file);
                            uploadTask.on("state_changed", console.log, console.error, () => {
                                ref.getDownloadURL().then((fileurl1) => {
                                    setFile(null);
                                    setURL(fileurl1);
                                    const ref = store.ref(`/registration/${localStorage.getItem("documentID")}/${file2.name}`);
                                    const uploadTask = ref.put(file2);
                                    uploadTask.on("state_changed", console.log, console.error, () => {
                                        ref.getDownloadURL().then((fileurl2) => {
                                            setFile2(null);
                                            setURL2(fileurl2);
                                            const ref = store.ref(`/registration/${localStorage.getItem("documentID")}/${file3.name}`);
                                            const uploadTask = ref.put(file3);
                                            uploadTask.on("state_changed", console.log, console.error, () => {
                                                ref.getDownloadURL().then((fileurl3) => {
                                                    setFile3(null);
                                                    setURL3(fileurl3);
                                                    db
                                                        .collection("registration")
                                                        .doc(localStorage.getItem("documentID"))
                                                        .update({
                                                            photoURL: fileurl1,
                                                            validID: fileurl2,
                                                            psacert: fileurl3,
                                                        })
                                                        .then((doc) => {
                                                            history.push(`/success/${"registration"}`);
                                                        });
                                                });
                                            })
                                        });
                                    })
                                });
                            })
                        })

                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    };

    const style = {
        textHelp: {
            color: "red"
        },

        uploadBtn: {
            width: "80px",
            padding: "10px",
            backgroundColor: "#2C84FF",
            textAlign: "center",
            borderRadius: "10px",
            color: "white"
        }
    }
    return (
        <Box className='base'>
            <Container className='registerContainer'>
                {/*<Typography variant="h5">Complete Your Profile</Typography>*/}
                <Box className='formContainer'>
                    {/* <Box className='imgContainer'>
                        <img className='usrImg' alt='profileImg' src={localStorage.getItem("photoURL")} />
                    </Box> */}
                    <FormGroup>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} >
                                <IconButton color="primary" aria-label="upload picture">
                                    <Box component="img" src={file} sx={{ width: 128, height: 128 }} />
                                </IconButton>
                                <Box sx={style.uploadBtn}>
                                    <input accept="image/*" id="icon-button-file" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChange} style={{ display: "none" }} />
                                    <label for="icon-button-file">Upload</label>
                                </Box>

                            </Box>

                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                required
                                id="filled-required"
                                label="First Name"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("fname")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                required
                                id="filled-required"
                                label="Last Name"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("lname")}
                            />
                        </FormControl>

                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                required
                                id="filled-required"
                                label="Middle Initials"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("mname")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                required
                                id="filled-required"
                                label="E-mail"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("email")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <InputLabel sx={{ color: 'black' }} >Gender</InputLabel>
                            <Select
                                id='gender'
                                label="Gender"
                                value={'Male'}
                                onChange={userInput("gender")}
                                value={payload.gender}
                            >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Others'}>Others/Prefer not to say</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                required
                                id="filled-required"
                                label="Phone Number"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("phoneNumber")}
                                value={payload.phoneNumber}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                required
                                id="filled-required"
                                label="Location"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("location")}
                            />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                required
                                id="filled-required"
                                label="Rate"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("rate")}
                                value={payload.rate}
                            />
                            <FormHelperText>How much you charge for a consultation.</FormHelperText>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "20px" }}>
                            <InputLabel sx={{ color: 'black' }} >Type</InputLabel>
                            <Select
                                id='Municipality'
                                label="Municipality *"
                                value={'Bustos'}
                                onChange={userInput("type")}
                                value={payload.type}
                            >
                                <MenuItem value={'General Doctor'}>General Doctor</MenuItem>
                                <MenuItem value={'Pediatrics'}>Pediatrics</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="h5">Verification Information</Typography>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <TextField
                                required
                                id="filled-required"
                                label="PRC License Number"
                                variant="outlined"
                                InputLabelProps={{
                                    style: { color: 'black' },
                                }}
                                onChange={userInput("prcno")}
                                value={payload.prcno}
                            />
                            <FormHelperText>Will be used to verify your Identity on the PRC Online Verification.</FormHelperText>
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <Typography variant="h6">Valid ID</Typography>
                            <input accept="image/*" id="icon-button-file" type="file" accept="image/x-png,image/jpeg" onChange={handleChange2} />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}>
                            <Typography variant="h6">PSA Birth Certificate</Typography>
                            <input accept="image/*" id="icon-button-file" type="file" accept="image/x-png,image/jpeg" onChange={handleChange3} />
                        </FormControl>
                        <FormControl required sx={{ m: 1, minWidth: 120, marginRight: "50px" }}>
                            <Button onClick={() => completeProfile()} variant='outlined' disabled={!file, !file2, !file3}>Complete</Button>
                            <FormHelperText>By clicking complete, you agree to the Privacy Policy.</FormHelperText>
                        </FormControl>

                    </FormGroup>
                </Box>
            </Container>
        </Box>
    )
}

export default withRouter(UserRegistration);