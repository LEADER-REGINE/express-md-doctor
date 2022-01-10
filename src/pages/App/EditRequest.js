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

export default function EditRequest() {

    const { id } = useParams();
    const history = useHistory();
    const db = firebase.firestore();
    const [appointmentData, setappointmentData] = useState({
        data: [],
    });

    const [specifiedDate, setSpecifiedDate] = useState(new Date());
    const [doctorProfile, setdoctorProfile] = useState({
        profile: [],
    });

    const [userProfile, setuserProfile] = useState({
        profile: [],
    });


    const handleChange = (newValue) => {
        setSpecifiedDate(newValue);
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

    const fetchDocData = async () => {
        let isMounted = true
        const docRef = await db.collection("doctors").doc(localStorage.getItem("uid"));
        let docProfile = [];
        docRef.get().then((doc) => {
            docProfile.push(doc.data());
            setdoctorProfile({ profile: docProfile });
        });
        isMounted = false
    };

    const fetchUserData = async () => {
        let isMounted = true
        const docRef = await db.collection("users").doc(id);
        let userProfile = [];
        docRef.get().then((doc) => {
            userProfile.push(doc.data());
            setuserProfile({ profile: userProfile });
        });
        isMounted = false
    };

    useEffect(() => {
        fetchDocData();
        fetchUserData();
        fetchData();
    }, []);

    const submitForm = (e) => {
        var docRef = db.collection("doctors")
            .doc(localStorage.getItem("uid"))
            .collection("requests")
            .doc(id);
        var userRef = db.collection("users")
            .doc(id)
            .collection("requests")
            .doc(id);
        userRef
            .update({
                datetime: specifiedDate,
                status: "Edited",
            })
            .then((docReference) => {
                docRef
                    .update({
                        datetime: specifiedDate,
                        status: "Edited",
                    })
                    .then((docRef) => {
                        history.push("/success");
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
    }

    return (
        <Box className="base">
            {
                appointmentData && appointmentData.data.map((data) => {
                    let setDate = data.datetime.toDate().toLocaleDateString();
                    let setTime = data.datetime.toDate().toLocaleTimeString();
                    return (
                        <Box>
                            <Typography variant="h5">Edit Time and Date</Typography>
                            <Box>
                                <Typography>Name: {data.userFullName}</Typography>
                                <Typography>Date: {setDate}</Typography>
                                <Typography>Time: {setTime}</Typography>
                                <Typography>Gender: {data.gender}</Typography>
                                <Typography>Location: {data.location}</Typography>
                            </Box>
                            <Box>
                                <Typography>Symptoms: {data.symptoms}</Typography>
                            </Box>
                            <Box>
                                <Typography>What do I feel: {data.feel}</Typography>
                                <Typography>Any Others?: {data.others}</Typography>
                            </Box>
                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <Stack spacing={3}>
                                        <MobileDatePicker
                                            label="Date"
                                            inputFormat="MM/dd/yyyy"
                                            value={specifiedDate}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <TimePicker
                                            label="Time"
                                            value={specifiedDate}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
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
