import { Typography, Box, Container, Button, Paper } from "@mui/material";
import Nav from "../components/appcomponents/Nav";
import TopPhoto from "../assets/Drawkit-Vector-Illustration-Medical-01 1.png";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../redux/actions/uiAction";
import Ticker from "react-ticker";
import CampaignIcon from "@mui/icons-material/Campaign";
import category from "../assets/child 1.png";
import doctorPhoto from "../assets/doctor 1.png";
import { NavLink, useHistory } from "react-router-dom";


export default function Welcome() {
    let history = useHistory();
    function Continue() {
        history.push("/dashboard")
    }

    return (
        <Box>
            <Typography>Welcome to ExpressMD for Doctors</Typography>
            <Button variant="contained" onClick={() => Continue()}>Continue</Button>
        </Box >
    );
}
