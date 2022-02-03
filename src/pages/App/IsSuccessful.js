import { Box, Container, Typography, Button, Paper } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

import { useHistory, useParams } from "react-router-dom";
import SearchInterface from '../../components/appcomponents/SearchInterface';
import '../../App.css'

export default function IsSuccessful() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { status } = useParams();

    const style = {
        outerCon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },

        innerConPaper: {
            display: "flex",
            backgroundColor: "#575757",
            flexDirection: "column",
            minWidth: "100px",
            padding: "20px",
            borderRadius: "10px",
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "280px"
        },

        label: {
            textAlign: "center",
            color: "white",
            fontSize: "18px"
        },
        sublabel: {
            textAlign: "center",
            color: "#E9E9E9",
            fontStyle: "italic",
            fontSize: "12px",
            marginTop: "10px",
            marginBottom: "10px"
        },

        btn: {

            backgroundColor: "#167694"
        },
    }

    return (
        <Box sx={style.outerCon}>
            {(() => {

                switch (status) {
                    case "completed":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Appointment Successfully Completed
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    The appointment has been completed. Thank you for using ExpressMD :) .
                                </Typography>
                                <Button variant="filled" sx={style.btn} onClick={() => history.push("/dashboard")}>OK</Button>
                            </Paper>
                        );
                    case "edited":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Edit Successful.
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    Time and date have been edited.
                                </Typography>
                                <Button variant="outlined" sx={style.btn} onClick={() => history.push("/dashboard")}>OK</Button>
                            </Paper>
                        );
                    case "cancellation":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Cancellation Confirmed
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    The appointment has been cancelled. The user will now be notified of the cancellation.
                                </Typography>
                                <Button variant="filled" sx={style.btn} onClick={() => history.push("/dashboard")}>OK</Button>
                            </Paper>
                        );
                    case "accepted":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Bid for request successfully placed
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    Bid for request successfully placed. Please wait for the user to accept your bid request. Thank You
                                </Typography>
                                <Button variant="filled" sx={style.btn} onClick={() => history.push("/dashboard")}>OK</Button>
                            </Paper>
                        );
                    case "registration":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Registration Pending
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    Registration Pending. Our team will now verify your account and send an email regarding your registration. Thank You.
                                </Typography>
                                <Button variant="filled" sx={style.btn} onClick={() => history.push("/dashboard")}>OK</Button>
                            </Paper>
                        );
                    case "claimpending":
                        return (
                            <Paper sx={style.innerConPaper}>
                                <Typography sx={style.label}>
                                    Claim Pending
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    You claim is now being reviewed. Our team will send your balance to your gcash account. Thank You.
                                </Typography>
                                <Button variant="filled" sx={style.btn} onClick={() => history.push("/dashboard")}>OK</Button>
                            </Paper>
                        );
                    default:
                        return null;
                }
            })()}
        </Box >
    );
}

