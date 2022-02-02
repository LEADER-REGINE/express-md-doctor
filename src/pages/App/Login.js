import {
  Typography,
  Box,
  Container,
  Button,
  Paper,
  TextField,
  FormGroup,
  FormControl,
  FormHelperText
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../../redux/actions/uiAction";
import bcrypt from "bcryptjs";
import firebase from "../../config/firebase";
import { NavLink, useHistory } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
import validator from "validator";
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
    marginTop: "50px",
    marginLeft: "20px",
    marginRight: "20px",
  },
  inputEmail: {
    marginTop: "-40px",
    [`& fieldset`]: {
      borderRadius: 4,
    },
  },
  loginBTN: {
    width: "250px",
    marginTop: "10px",
  },
};

const db = firebase.firestore();

export default function Login() {
  let history = useHistory();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [validate, setValidate] = useState(false);
  const [passwordError, setpasswordError] = useState("");
  const [accountError, setAccountError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [emailError, setEmailError] = useState("");
  const [fill, setFill] = useState("");
  const userInputEmail = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
      setAccountError("");
      setValidate(false);
    }
  };

  const userInputPassword = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
  };

  const login = (e) => {
      console.log(validate)
    if (!payload.email || !payload.password) {
        setFill(true);
    }
    else if (payload.email || payload.password) {
        setFill(false);
      }

    if (!emailError) {
        //invalid
        setValidate(true);
    }
    
    else {
      setValidate(false); //valid
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          localStorage.setItem("uid", user.uid);
          // ...
          history.push("/dashboard");
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
        <FormGroup>
          <FormControl
            required
            sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "50px" }}
          >
            <TextField
              error={(fill, validate)}
              placeholder="Email"
              autoComplete="off"
              onChange={userInputEmail("email")}
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
                ),
              }}
            />
            <FormHelperText sx={style.textHelp}>
                {validate ? "Please enter valid a email" : ""}
                {accountError ? "Account does not exist" : ""}
              </FormHelperText>
          </FormControl>
          <FormControl
            required
            sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "50px" }}
          >
            <TextField
              error={(passwordError, fill)}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={userInputPassword("password")}
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
             <FormHelperText sx={style.textHelp}>
                {fill ? "Please enter password" : ""}
                {passwordError ? "Wrong password " : ""}
              </FormHelperText>
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 120 , display : "flex" , alignItems : "center" , justifyContent : "center" }}>
            <Button
              variant="contained"
              onClick={() => login()}
              sx={style.loginBTN}
            >Login
            </Button>
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 120 , display : "flex" , alignItems : "center" , justifyContent : "center"}}>
            <Button
              variant="contained"
              onClick={() => history.push("/register")}
              sx={style.loginBTN}
            >Register
            </Button>
          </FormControl>
        </FormGroup>
      </Box>
    </Box>
  );
}
