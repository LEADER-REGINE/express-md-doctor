import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Rating, FormLabel, FormGroup, FormControlLabel, FormHelperText, FormControl, Paper } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';
import { getAuth } from "firebase/auth";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

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

export default function ViewArchive() {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const history = useHistory();

    const db = firebase.firestore();
    const [appointmentData, setappointmentData] = useState({
        data: [],
    });
    const [docData, setdocData] = useState({
        data: [],
    });

    const [payload, setPayload] = useState({
        review: "",
    });
    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };

    const fetchData = async () => {
        let isMounted = true
        const docRef = db.collection("doctors").doc(localStorage.getItem("uid")).collection("archive").doc(id);
        let rawData = [];
        docRef.get().then((doc) => {
            rawData.push(doc.data());
            setappointmentData({ data: rawData });
            localStorage.setItem("userID", doc.data().userID);
            localStorage.setItem("userDocID", doc.data().ratingID);
        });
        isMounted = false
    };

    const fetchDoc = async () => {
        let isMounted = true
        const docRef = db.collection("doctors").doc(localStorage.getItem("uid")).collection("usrrating").doc(localStorage.getItem("userDocID"));
        let rawData = [];
        docRef.get().then((doc) => {
            rawData.push(doc.data());
            setdocData({ data: rawData });

        });
        isMounted = false
    };

    useEffect(() => {
        fetchData();
        fetchDoc();
    }, []);

    const style = {
        innerCon: {
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            marginLeft: "30px",
            alignItems: "center",

        },
        patientProf: {
            width: "90px",
            height: "90px",
            borderRadius: "90px"
        },
        superInnerCon: {
            marginLeft: "30px"
        },
        innerSub: {
            fontSize: "24px",
            marginLeft: "25px",
            marginTop: "20px",
        },

        inputField: {
            display: "flex",
            marginLeft: "30px",
            marginRight: "30px",
            justifyContent: "center",
            marginTop: "10px",

        },

        textField: {
            width: "350px",
        },

        dateTimeCon: {
            marginTop: "50px",
            marginLeft: "20px",
            marginRight: "30px",
            minWidth: "200px",
        },
        dateandTime: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "20px",
            marginRight: "30px",

        },

        con: {
            marginTop: "50px"
        },

        dateAndTime: {
            marginTop: "10px"
        },

        notelabel: {
            fontSize: "12px",
            fontStyle: "Italic",
            marginLeft: "20px",
            color: "gray"
        },

        btnBox: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "20px"
        },

        btn: {
            width: "200px",
            marginBottom: "10px",
            borderRadius: "10px"
        }
    }

    return (
        <Box className="base">
            {
                appointmentData && appointmentData.data.map((data) => {
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    let setDate = data.datetime.toDate().toLocaleDateString('en-US', options);
                    let setTime = data.datetime.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                    return (
                        <Box>

                            <Box sx={style.innerCon}>
                                <Box>
                                    <Box component="img" alt="Image of Patient" sx={style.patientProf} src={data.photoURL} />
                                </Box>
                                <Box sx={style.superInnerCon}>
                                    <Typography variant="subtitle1">Name: {data.userFullName}</Typography>
                                    <Typography variant="subtitle1">Date: {setDate}</Typography>
                                    <Typography variant="subtitle1">Time: {setTime}</Typography>
                                    <Typography variant="subtitle1">Gender: {data.gender}</Typography>
                                    <Typography variant="subtitle1">Location: {data.location}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography>Doctor's Notes</Typography>
                                <TextField readOnly value={data.notes} />
                            </Box>
                            {(() => {
                                switch (data.status) {
                                    case "Completed":
                                        if (!data.rated) {
                                            return (
                                                <Box>
                                                    <Typography>This user has not yet rated you</Typography>
                                                </Box>
                                            );
                                        } else {
                                            return (
                                                <Box>
                                                    {
                                                        docData && docData.data.map((data2) => {
                                                            return (
                                                                <Box>
                                                                    <Paper>
                                                                        <Rating
                                                                            readOnly
                                                                            value={data2.rating}
                                                                            precision={1}
                                                                            icon={<StarRoundedIcon />}
                                                                            emptyIcon={<StarRoundedIcon />}
                                                                        />
                                                                        <TextField readOnly value={data2.review} />
                                                                    </Paper>
                                                                </Box>
                                                            )
                                                        })
                                                    }
                                                </Box>
                                            );
                                        }

                                    case "Declined":
                                        return null;
                                    default:
                                        return null;
                                }
                            })()}
                        </Box>
                    );
                })
            }

        </Box>
    );
}
