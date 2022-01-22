import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Stack } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import { getAuth } from "firebase/auth";

const style = {
    parentCon: {
        display: "flex",
        margin: "20px",
        alignItems: "center"

    },
    label: {
        fontSize: "24px",
        marginRight: "10px"
    },

    subLabel: {
        fontSize: "18px",
        fontStyle: "italic",
        color: "red"
    },
    textField: {
        width: "300px",
    },
    inputField: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
    }
}

export default function DeclineRequest() {

    const { id } = useParams();
    const history = useHistory();
    const db = firebase.firestore();
    const [appointmentData, setappointmentData] = useState({
        data: [],
    });

    const [payload, setPayload] = useState({
        reason: "",
    });
    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };

    const fetchData = async () => {
        let isMounted = true
        const docRef = await db.collection("doctors").doc(localStorage.getItem("uid")).collection("requests").doc(id);
        let rawData = [];
        docRef.get().then((doc) => {
            rawData.push(doc.data());
            setappointmentData({ data: rawData });
        });
        isMounted = false
    };


    useEffect(() => {

        fetchData();
    }, []);

    const submitForm = (e) => {
        if (!payload.reason) {
            alert("Please enter the required fields!");
        } else {
            var docRefMove = db.collection("doctors")
                .doc(localStorage.getItem("uid"))
                .collection("archive")
            var userRefMove = db.collection("users")
                .doc(id)
                .collection("archive")
            var docRefDelete = db.collection("doctors")
                .doc(localStorage.getItem("uid"))
                .collection("requests")
                .doc(id);
            var userRefDelete = db.collection("users")
                .doc(id)
                .collection("requests")
                .doc(id);
            appointmentData.data.map((data) => {
                userRefMove
                    .add({
                        feel: data.feel,
                        symptoms: data.symptoms,
                        others: data.others,
                        assigned_doctor: data.assigned_doctor,
                        doctorId: data.doctorId,
                        userID: data.userID,
                        userFullName: data.userFullName,
                        datetime: data.datetime,
                        gender: data.gender,
                        location: data.location,
                        phoneNumber: data.phoneNumber,
                        reason: payload.reason,
                        photoURL: data.photoURL,
                        status: "Declined",
                    })
                    .then((docReference) => {
                        console.log(docReference.id);
                        userRefMove
                            .doc(docReference.id)
                            .update({
                                documentId: docReference.id,
                            })
                            .then((doc1) => {
                                docRefMove
                                    .add({
                                        feel: data.feel,
                                        symptoms: data.symptoms,
                                        others: data.others,
                                        assigned_doctor: data.assigned_doctor,
                                        doctorId: data.doctorId,
                                        userID: data.userID,
                                        userFullName: data.userFullName,
                                        datetime: data.datetime,
                                        gender: data.gender,
                                        location: data.location,
                                        phoneNumber: data.phoneNumber,
                                        reason: payload.reason,
                                        photoURL: data.photoURL,
                                        status: "Declined",
                                    })
                                    .then((docRef) => {
                                        docRefMove
                                            .doc(docRef.id)
                                            .update({
                                                documentId: docRef.id,
                                            })
                                            .then((docRef2) => {
                                                docRefDelete.delete().then(() => {
                                                    userRefDelete.delete().then(() => {
                                                        history.push("/success");
                                                    }).catch((error) => {
                                                        console.error("Error removing document: ", error);
                                                    });
                                                }).catch((error) => {
                                                    console.error("Error removing document: ", error);
                                                });
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                                history.push("/sorry");
                                            });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        history.push("/sorry");
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                                history.push("/sorry");
                            });

                    })
                    .catch((error) => {
                        console.log(error);
                        history.push("/sorry");
                    });
            })


        }

    }

    return (
        <Box className="base">
            {
                appointmentData && appointmentData.data.map((data) => {
                    let setDate = data.datetime.toDate().toLocaleDateString();
                    let setTime = data.datetime.toDate().toLocaleTimeString();
                    return (
                        <Box key={data.userID}>
                            <Typography variant="h5">Edit Time and Date</Typography>
                            <Box>
                                <Typography>Name: {data.userFullName}</Typography>
                                <Typography>Date: {setDate}</Typography>
                                <Typography>Time: {setTime}</Typography>
                                <Typography>Location: {data.location}</Typography>
                            </Box>
                            <Box>
                                <Typography >Reason for Decline? </Typography>
                                <Typography>*Required</Typography>
                            </Box>
                            <Box >
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    multiline
                                    maxRows={10}
                                    minRows={6}
                                    onChange={userInput("reason")}
                                />

                            </Box>
                            <Box>
                                <Button variant="contained" onClick={() => submitForm()}>Continue</Button>
                                <Button variant="contained" onClick={() => history.goBack()}>Cancel</Button>
                            </Box>
                        </Box>
                    );
                })
            }
        </Box>
    );
}
