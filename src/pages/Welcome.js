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
import Banner from "../assets/image 45.png"

const style = {
    outerCon : {
        display : "flex",
        alignItems : "center",
        flexDirection : "column"
    },
    bannerCon : {
        display : "flex",
        marginTop : "150px"
        
    },
    banner : {
        height : "170px",
        width : "250px"
    },

    label : {
        fontSize : "18px",
        marginBottom : "180px"
    },
    continueBTN : {
        width : "200px"
    }
}

export default function Welcome() {
    let history = useHistory();
    function Continue() {
        history.push("/dashboard")
    }

    return (
        <Box sx = {style.outerCon}>
            <Box sx ={style.bannerCon}>
                <Box component = "img" src = {Banner} sx = {style.banner}></Box>
            </Box>
            <Typography sx = {style.label}>Welcome to ExpressMD for Doctors</Typography>
            <Button variant="contained" onClick={() => Continue()} sx = {style.continueBTN}>Continue</Button>
        </Box >
    );
}
