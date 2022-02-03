import { Typography, Box, Container, Button, Paper, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "../../config/firebase";
import Icon from "@mui/material/Icon";
import { loadCSS } from "fg-loadcss";
const style = {
    requestBtn: {
        borderColor: "white",
    },

    textBtn: {
        display: "flex",
        flexWrap: "wrap",
        fontSize: "14px",
        color: "white",
        padding: "15px",
        textAlign: "center",
    },

    topPhoto: {
        height: "150px",
        width: "110px",
        marginLeft: "10px",
    },

    topContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
    },
    paperContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#16C2D5",
    },

    wrapper: {
        marginTop: "30px",
        maxHeight: "80px",
        display: "flex",
        overflowX: "auto",
        "-webkit-scrollbar": {
            display: "none",
        },
        "-ms-overflow-style": "none",
    },

    categoryPaper: {
        minWidth: "200px",
        height: "80px",
        borderColor: "#7EB6BC",
        borderWidth: "2px",
        marginRight: "20px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
    },

    item: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    category: {
        height: "50px",
        width: "50px",
        alignItems: "center",
        padding: "5px",
        borderRadius: "3px",
    },
    categoryText: {
        fontSize: "14px",
        marginLeft: "8px",
    },

    label: {
        marginTop: "20px",
    },

    upcommingReq: {
        minWidth: "350px",
        padding: "10px",
        borderColor: "#7EB6BC",
        borderWidth: "2px",
        marginBottom: "20px",

    },
    outerCon: {
        marginLeft: "20px",
        marginRight: "20px"
    },
    LabelCon: {
        marginTop: "5px",
        textAlign: 'center',
        marginLeft: "10px"
    },
    Label: {
        fontSize: "24px"
    }
};

export default function Feed() {
    const [isReqEmpty, setisReqEmpty] = useState(false);
    const history = useHistory();
    const db = firebase.firestore();
    const [fetchPendingAppointments, setfetchPendingAppointments] = useState({
        appointments: [],
    });

    const fetchReqList = async () => {
        const userRef = db.collection("requests").orderBy("timestamp").where("status", "==", "Waiting");
        userRef.onSnapshot((doc) => {
            if (doc.size != 0) {
                setisReqEmpty(false);
                userRef.onSnapshot((doc) => {
                    let getPendingAppointment = [];
                    doc.forEach((req) => {
                        getPendingAppointment.push(req.data());
                    });
                    setfetchPendingAppointments({ appointments: getPendingAppointment });
                });
            } else {
                // doc.data() will be undefined in this case
                setisReqEmpty(true);
            }
        });
    };
    useEffect(() => {
        fetchReqList();
    }, []);

     //fontawesome
     React.useEffect(() => {
        const node = loadCSS(
            "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
            // Inject before JSS
            document.querySelector("#font-awesome-css") || document.head.firstChild
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);
    return (
        <Box className="base">
            <Typography className="headerStyle">
                <Icon
                    baseClassName="fas"
                    className="fas fa-address-card"
                    sx={{
                        fontSize: { xs: 30, md: 50 },
                        color: "primary",
                        width: 300,
                        marginTop: 2,
                    }}
                />
            </Typography>
            <Box sx={style.LabelCon}>
                <Typography sx={style.Label}>Post Feed</Typography>
            </Box>
            <Container>
                <Box className="schedBox">
                    <Container>
                        


                        <Box className="schedDetails">
                            {isReqEmpty ? (
                                <Typography className="schedText" variant="subtitle2">
                                    There are no requests posted.
                                </Typography>
                            ) : (
                                fetchPendingAppointments.appointments.map(
                                    (setappointment) => {
                                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                                        let setDate = setappointment.datetime.toDate().toLocaleDateString('en-US', options);
                                        let setTime = setappointment.datetime
                                            .toDate()
                                            .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                        let postDate = setappointment.timestamp
                                            .toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                        return (
                                            <Link
                                                key={setappointment.userID}
                                                to={`view/${setappointment.userID}`}
                                            >
                                                <Box sx={style.outerCon}>
                                                    <Paper sx={style.upcommingReq} variant="outlined">
                                                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                                                            <Box>
                                                                <Avatar sx={{ width: 64, height: 64 }} src={setappointment.photoURL} alt="user image" />
                                                            </Box>
                                                            <Box style={{ marginLeft: "30px" }}>
                                                                <Typography variant="h6">
                                                                    {setappointment.userFullName}
                                                                </Typography>
                                                                <Typography variant="subtitle2">
                                                                    {setappointment.location}
                                                                </Typography>
                                                                <Typography variant="subtitle2">
                                                                    {postDate}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ marginTop: "15px" }}>
                                                            <Typography variant="subtitle1">
                                                                Symptoms: {setappointment.symptoms}
                                                            </Typography>
                                                            <Typography variant="subtitle1">
                                                                Date: {setDate}
                                                            </Typography>
                                                            <Typography variant="subtitle1">
                                                                Appointment Time: {setTime}
                                                            </Typography>
                                                        </Box>
                                                    </Paper>
                                                </Box>
                                            </Link>
                                        );
                                    }
                                )
                            )}
                        </Box>

                    </Container>
                </Box>

            </Container>
        </Box>
    );
}
