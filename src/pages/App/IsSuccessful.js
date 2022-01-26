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
                                    Request Accepted
                                </Typography>
                                <Typography sx={style.sublabel}>
                                    Your may now contact the patient using their Phone Number. Thank You for using ExpressMD. Stay Safe.
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

