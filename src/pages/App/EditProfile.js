import React, { useState, useEffect } from "react";
import { Box, TextField, Button, IconButton, Avatar } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import { getAuth } from "firebase/auth";
import '../../App.css';
import "./EditProfile.css"


export default function EditProfile() {

    const db = firebase.firestore();
    const store = firebase.storage();
    const [docProfile, setdocProfile] = useState({
        profile: [],
    })

    const [firstField, setnameField] = useState(true);
    const [middleField, setmiddleField] = useState(true);
    const [lastField, setlastField] = useState(true);
    const [phoneField, setphoneField] = useState(true);

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    const fetchList = async () => {
        const docRef = db.collection('doctors').doc(localStorage.getItem("uid"));
        let usrProfile = [];
        docRef.get().then(doc => {
            usrProfile.push(doc.data());
            setdocProfile({ profile: usrProfile });
        })
    }
    useEffect(() => {
        fetchList();
    }, []);

    const [credentials, setCredentials] = useState({
        firstname: "",
        middleinitials: "",
        phoneNumber: "",
        lastname: "",
    });

    const userInput = (prop) => (e) => {
        setCredentials({ ...credentials, [prop]: e.target.value });
    };

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function uploadImage() {
        const ref = store.ref(`/images/doctors/${localStorage.getItem("uid")}/${file.name}`);
        const uploadTask = ref.put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref.getDownloadURL().then((url) => {
                setFile(null);
                setURL(url);
                db
                    .collection("doctors")
                    .doc(localStorage.getItem("uid"))
                    .update({
                        photoURL: url,
                    })
                    .then((doc) => { window.location.reload() });
            });
        })
    }

    const changefname = (e) => {
        setnameField(true);
        if (!credentials.firstname) {
            alert("Please enter your name!");
            setnameField(true);
        } else {
            db
                .collection("doctors")
                .doc(localStorage.getItem("uid"))
                .update({
                    firstname: credentials.firstname,
                })
                .then((doc) => { window.location.reload() });

        }

    }

    const changemname = (e) => {
        setnameField(true);
        if (!credentials.middleinitials) {
            alert("Please enter your name!");
            setmiddleField(true);
        } else {
            db
                .collection("doctors")
                .doc(localStorage.getItem("uid"))
                .update({
                    middleInitials: credentials.middleinitials,
                })
                .then((doc) => { window.location.reload() });

        }

    }

    const changelname = (e) => {
        setnameField(true);
        if (!credentials.lastname) {
            alert("Please enter your name!");
            setlastField(true);
        } else {
            db
                .collection("doctors")
                .doc(localStorage.getItem("uid"))
                .update({
                    lastname: credentials.lastname,
                })
                .then((doc) => { window.location.reload() });

        }

    }

    const changephone = (e) => {
        setphoneField(true);
        if (!credentials.phoneNumber) {
            alert("Please enter your phone number!");
            setnameField(true);
        } else {
            db
                .collection("doctors")
                .doc(localStorage.getItem("uid"))
                .update({
                    phoneNum: credentials.phoneNumber,
                })
                .then((doc) => { window.location.reload() });
        }

    }

    return (
        <Box className="base">
            {
                docProfile && docProfile.profile.map((docProfile) => {
                    return (
                        <Box>
                            <Box className="avatarChange">
                                <Box className="avatarContainer">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <Avatar src={docProfile.photoURL} sx={{ width: 128, height: 128 }} />
                                    </IconButton>
                                    <input accept="image/*" id="icon-button-file" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChange} />
                                </Box>
                                <Box>
                                    <Button onClick={() => uploadImage()} variant='outlined' disabled={!file}>Upload</Button>
                                </Box>
                            </Box>
                            <Box className="nameChange">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="First Name"
                                    defaultValue={docProfile.firstname}
                                    disabled={firstField}
                                    onChange={userInput("firstname")}
                                />
                                {
                                    firstField ? (
                                        <Button onClick={() => setnameField(false)}>Edit First Name</Button>
                                    ) : (
                                        <Button onClick={() => changefname()}>Save</Button>
                                    )
                                }
                            </Box>

                            <Box className="nameChange">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Middle Initials"
                                    defaultValue={docProfile.middleInitials}
                                    disabled={middleField}
                                    onChange={userInput("middleinitials")}
                                    inputProps={{ maxLength: 2 }}
                                />
                                {
                                    middleField ? (
                                        <Button onClick={() => setmiddleField(false)}>Edit Middle Name</Button>
                                    ) : (
                                        <Button onClick={() => changemname()}>Save</Button>
                                    )
                                }
                            </Box>


                            <Box className="nameChange">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Last Name"
                                    defaultValue={docProfile.lastname}
                                    disabled={lastField}
                                    onChange={userInput("lastname")}
                                />
                                {
                                    lastField ? (
                                        <Button onClick={() => setlastField(false)}>Edit Last Name</Button>
                                    ) : (
                                        <Button onClick={() => changelname()}>Save</Button>
                                    )
                                }
                            </Box>

                            <Box className="phoneChange">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Phone Number"
                                    defaultValue={docProfile.phoneNum}
                                    disabled={phoneField}
                                    onChange={userInput("phoneNumber")}
                                />
                                {
                                    phoneField ? (
                                        <Button onClick={() => setphoneField(false)}>Edit Number</Button>
                                    ) : (
                                        <Button onClick={() => changephone()}>Save</Button>
                                    )
                                }
                            </Box>
                        </Box>
                    )
                })
            }
        </Box >
    );
}
