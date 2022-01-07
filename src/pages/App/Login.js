import { Typography, Box, Container, Button, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";
import bcrypt from 'bcryptjs';
import firebase from '../../config/firebase';
import { NavLink, useHistory } from "react-router-dom";

const style = {
    loginLabel : {
        fontSize : "45px",
        marginLeft : "25px",
        marginTop : "100px",
        color : "#808080"
    },
    outerCon : {
        display : "flex",
        justifyContent : "center",
        flexDirection : "column",
        alignItems : "center"
    },
    inputEmail : {
        width : "270px",
        marginTop : "20px"
    },
    loginBTN : {
        width : "250px",
        marginTop : "20px"
    }
}


const db = firebase.firestore();

export default function Login() {
    let history = useHistory();
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });

    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };

    const login = (e) => {
        if (!payload.email || !payload.password) {
            alert("Make sure all fields are filled");
        } else {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    console.log(user);
                    // ...
                    history.push("/dashboard")
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    };

    return (
        <Box>
            <Typography sx = {style.loginLabel}>Login</Typography>
            <Box sx = {style.outerCon}>
                <TextField label="Email"
                    onChange={userInput("email")}
                    value={payload.email}
                    sx = {style.inputEmail}
                    variant = "standard"
                />
                <TextField label="Password"
                type="password"
                onChange={userInput("password")}
                value={payload.password}
                sx = {style.inputEmail}
                variant = "standard"
                 />
                <Button variant="contained"
                onClick={() => login()}
                sx = {style.loginBTN}>Login</Button>
        </Box>
        </Box>
    );
}
