import { Typography, Box, Container, Button, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";
import bcrypt from 'bcryptjs';
import firebase from '../../config/firebase';
import { NavLink, useHistory } from "react-router-dom";


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
            <TextField label="Email"
                onChange={userInput("email")}
                value={payload.email}
            />
            <TextField label="Password"
                type="password"
                onChange={userInput("password")}
                value={payload.password} />

            <Button variant="contained"
                onClick={() => login()}
            >Login</Button>
        </Box>
    );
}
