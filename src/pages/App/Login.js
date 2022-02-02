import { Typography, Box, Container, Button, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";
import bcrypt from 'bcryptjs';
import firebase from '../../config/firebase';
import { NavLink, useHistory } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';
import validator from 'validator'
import { IconButton } from "@mui/material";

const style = {
    loginLabel: {
        fontSize: "45px",
        marginLeft: "25px",
        marginTop: "100px",
        color: "#808080",
    },
    outerCon: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
    },
    inputEmail: {
        marginTop: "20px",

        [`& fieldset`]: {
            borderRadius: 4,
        },

    },
    loginBTN: {
        width: "250px",
        marginTop: "20px"
    }
}




const db = firebase.firestore();

export default function Login() {
    let history = useHistory();
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const [emailError, setEmailError] = useState("")
    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
        var email = e.target.value
        if (validator.isEmail(email)) {
            setEmailError(true)



        } else {
            setEmailError(false)


        }
    };

    const login = (e) => {
        if (!payload.email || !payload.password) {
            alert("Make sure all fields are filled");
        } else {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    localStorage.setItem("uid", user.uid);
                    // ...
                    history.push("/dashboard")
                })
                .catch((error) => {
                    if (error.code == "auth/wrong-password") {
                        setpasswordError(true);
                    } else if (!error.code == "auth/wrong-password") {
                        setpasswordError(false);
                    }

                    if (error.code == "auth/user-not-found") {
                        setAccountError(true);
                    } else {
                        setAccountError(false);
                    }
                });
        }
    };

    return (
        <Box>
            <Typography sx={style.loginLabel}>Login</Typography>
            <Box sx={style.outerCon}>
                <TextField
                    placeholder="Email"
                    autoComplete="off"
                    onChange={userInput("email")}
                    value={payload.email}
                    sx={style.inputEmail}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),

                        endAdornment: (
                            <InputAdornment position="end">

                                {emailError ? <CheckCircle /> : <CancelIcon />}

                            </InputAdornment>
                        )
                    }}
                />
                <TextField placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onChange={userInput("password")}
                    value={payload.password}
                    sx={style.inputEmail}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained"
                    onClick={() => login()}
                    sx={style.loginBTN}>Login</Button>
                <Button variant="contained"
                    onClick={() => history.push("/register")}
                    sx={style.loginBTN}>Register</Button>
            </Box>
        </Box>
    );
}
