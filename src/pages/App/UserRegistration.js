import {
  Box,
  Container,
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormHelperText,
  Select,
  InputLabel,
  MenuItem,
  Typography,
  Avatar
} from "@mui/material";
import firebase from "../../config/firebase";
import React, { useState } from "react";
import { useHistory, withRouter, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import Compress from "react-image-file-resizer";
import Compressor from 'compressorjs';
import imageCompression from 'browser-image-compression';
import "./Registration.css";
import validator from "validator";

function UserRegistration() {
  const location = useLocation();

  const db = firebase.firestore();
  const store = firebase.storage();
  const history = useHistory();
  const [payload, setPayload] = useState({
    fname: "",
    mname: "",
    lname: "",
    gender: "",
    phoneNumber: "",
    location: "",
    type: "",
    rate: "",
    prcno: "",
    email: "",
    profession: "",
  });

  const [file, setFile] = useState("");
  const [url, setURL] = useState("");



  const [file2, setFile2] = useState("");
  const [url2, setURL2] = useState("");

  const [file3, setFile3] = useState("");
  const [url3, setURL3] = useState("");
  const [imagepreview3, setimagePreview3] = useState(null)
  const [imagepreview2, setimagePreview2] = useState(null)
  const [imagepreview1, setimagePreview1] = useState(null)
  const [compressedFile3, setCompressedFile] = useState(null);

  function handleChange(e) {
    setimagePreview1(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0])

  }
  function handleChange2(e) {
    setimagePreview2(URL.createObjectURL(e.target.files[0]));
    setFile2(e.target.files[0])
    console.log(e.target.files[0]);
  }
  function handleChange3(e) {
    setimagePreview3(URL.createObjectURL(e.target.files[0]));
    setFile3(e.target.files[0]);
  }
  const [fill, setFill] = useState("")
  const [emailError, setEmailError] = useState("");
  const userInputEmail = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email");
      setFill(false)
    }
  };

  const userInput = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
    setFill(false)
  };
  const completeProfile = (e) => {
    if (
      !payload.fname ||
      !payload.mname ||
      !payload.lname ||
      !payload.email ||
      !payload.gender ||
      !payload.location ||
      !payload.phoneNumber ||
      !payload.type ||
      !payload.prcno ||
      !payload.rate ||
      !payload.profession
    ) {
      setFill(true);
    } else {
      db.collection("registration")
        .add({
          fname: payload.fname,
          lname: payload.lname,
          mname: payload.mname,
          email: payload.email,
          gender: payload.gender,
          type: payload.type,
          prcno: payload.prcno,
          rate: payload.rate,
          phoneNumber: payload.phoneNumber,
          location: payload.location,
          profession: payload.profession,
        })
        .then((docRef) => {
          localStorage.setItem("documentID", docRef.id);
          db.collection("registration")
            .doc(docRef.id)
            .set({
              documentID: docRef.id,
            })
            .then((doc) => {
              const ref = store.ref(
                `/registration/${localStorage.getItem("documentID")}/${file.name
                }`
              );
              const uploadTask = ref.put(file);
              uploadTask.on("state_changed", console.log, console.error, () => {
                ref.getDownloadURL().then((fileurl1) => {
                  setFile(null);
                  setURL(fileurl1);
                  const ref = store.ref(
                    `/registration/${localStorage.getItem("documentID")}/${file2.name
                    }`
                  );
                  const uploadTask = ref.put(file2);
                  uploadTask.on(
                    "state_changed",
                    console.log,
                    console.error,
                    () => {
                      ref.getDownloadURL().then((fileurl2) => {
                        setFile2(null);
                        setURL2(fileurl2);
                        const ref = store.ref(
                          `/registration/${localStorage.getItem(
                            "documentID"
                          )}/${file3.name}`
                        );
                        const uploadTask = ref.put(file3);
                        uploadTask.on(
                          "state_changed",
                          console.log,
                          console.error,
                          () => {
                            ref.getDownloadURL().then((fileurl3) => {
                              setFile3(null);
                              setURL3(fileurl3);
                              db.collection("registration")
                                .doc(localStorage.getItem("documentID"))
                                .update({
                                  photoURL: fileurl1,
                                  validID: fileurl2,
                                  psacert: fileurl3,
                                  fname: payload.fname,
                                  lname: payload.lname,
                                  mname: payload.mname,
                                  email: payload.email,
                                  gender: payload.gender,
                                  type: payload.type,
                                  prcno: payload.prcno,
                                  rate: payload.rate,
                                  phoneNumber: payload.phoneNumber,
                                  location: payload.location,
                                  timestamp: new Date(),
                                  status: "Pending",
                                  profession: payload.profession,
                                })
                                .then((doc) => {
                                  history.push(`/success/${"registration"}`);
                                });
                            });
                          }
                        );
                      });
                    }
                  );
                });
              });
            });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  const style = {
    textHelp: {
      color: "red",
    },

    uploadBtn: {
      width: "80px",
      padding: "10px",
      backgroundColor: "#2C84FF",
      textAlign: "center",
      borderRadius: "10px",
      color: "white",
    },
    textInput: {
      [`& fieldset`]: {
        borderRadius: 4,
      },
    },
    file2img: {
      width: "200px",
      borderRadius: "10px"
    },

    file2imgCon: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }
  };
  return (
    <Box className="base">
      <Container className="registerContainer">
        {/*<Typography variant="h5">Complete Your Profile</Typography>*/}
        <Box className="formContainer">
          {/* <Box className='imgContainer'>
                        <img className='usrImg' alt='profileImg' src={localStorage.getItem("photoURL")} />
                    </Box> */}
          <FormGroup>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <IconButton color="primary" aria-label="upload picture">
                  <Avatar
                    src={imagepreview1}
                    sx={{ width: 128, height: 128 }}
                  />
                </IconButton>
                <Box sx={style.uploadBtn}>
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                  <label for="icon-button-file">Upload</label>
                </Box>
              </Box>
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                sx={style.textInput}
                required
                autoComplete="off"
                id="filled-required"
                placeholder="First Name"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("fname")}
              />
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                sx={style.textInput}
                required
                autoComplete="off"
                id="filled-required"
                placeholder="Last Name"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("lname")}
              />
            </FormControl>

            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                sx={style.textInput}
                required
                autoComplete="off"
                id="filled-required"
                placeholder="Middle Initials"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("mname")}
              />
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                sx={style.textInput}
                required
                autoComplete="off"
                id="filled-required"
                placeholder="E-mail"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInputEmail("email")}
              />
              <FormHelperText sx={style.textHelp}>
                {emailError}
              </FormHelperText>
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <InputLabel sx={{ color: "black" }}>Gender</InputLabel>
              <Select
                sx={style.textInput}
                id="gender"
                label="Gender"
                value={"Male"}
                onChange={userInput("gender")}
                value={payload.gender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Others"}>Others/Prefer not to say</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                sx={style.textInput}
                required
                autoComplete="off"
                id="filled-required"
                placeholder="Phone Number"
                type="tel"
                pattern="[0-9]"
                inputProps={{ maxLength: 11, minLength: 11 }}
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("phoneNumber")}
                value={payload.phoneNumber}
                type="tel"
              />
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                sx={style.textInput}
                required
                autoComplete="off"
                id="filled-required"
                placeholder="Location (Barangay , Municipality)"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("location")}
              />
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                sx={style.textInput}
                required
                autoComplete="off"
                id="filled-required"
                placeholder="Rate"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("rate")}
                value={payload.rate}
                type="tel"
              />
              <FormHelperText>
                How much you charge for a consultation.
              </FormHelperText>
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "20px" }}
            >
              <InputLabel sx={{ color: "black" }}>Type</InputLabel>
              <Select
                sx={style.textInput}
                id="Type"
                label="Type"
                value={"General Doctor"}
                onChange={userInput("type")}
                value={payload.type}
              >
                <MenuItem value={"General Doctor"}>General Doctor</MenuItem>
                <MenuItem value={"OB/GYN"}>OB/GYN</MenuItem>
                <MenuItem value={"Orthopedics"}>Orthopedics</MenuItem>
                <MenuItem value={"Pediatrics"}>Pediatrics</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="h5" style={{ marginTop: "10px" }}>
              Verification Information
            </Typography>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                sx={style.textInput}
                required
                autoComplete="off"
                id="filled-required"
                placeholder="PRC Profession"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("profession")}
                value={payload.profession}
              />
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <TextField
                sx={style.textInput}
                required
                autoComplete="off"
                id="filled-required"
                placeholder="PRC License Number"
                variant="outlined"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                onChange={userInput("prcno")}
                value={payload.prcno}
                inputProps={{ maxLength: 7, minLength: 7 }}
                type="tel"
              />
              <FormHelperText>
                {fill ? <Typography variant="h8">"Please fill out all of the fields"</Typography> : " Will be used to verify your Identity on the PRC Online Verification."}

              </FormHelperText>
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            >
              <Box sx={style.file2imgCon}>
                <Box>
                  <Typography variant="h6">Valid ID</Typography>
                  <Box sx={style.uploadBtn}>
                    <input
                      accept="image/*"
                      id="icon-button-file2"
                      type="file"
                      accept="image/x-png,image/jpeg"
                      onChange={handleChange2}
                      style={{ display: "none" }}
                    />
                    <label for="icon-button-file2">Upload</label>
                  </Box>
                </Box>

                <Box sx={style.file2img} component="img" src={imagepreview2}></Box>
              </Box>
            </FormControl>
            <FormControl
              required
              sx={{ m: 1, minWidth: 120, zIndex: 0, marginTop: "30px" }}
            > <Box sx={style.file2imgCon}>
                <Box>
                  <Typography variant="h6">PSA Birth Certificate</Typography>
                  <Box sx={style.uploadBtn}>
                    <input
                      accept="image/*"
                      id="icon-button-file3"
                      type="file"
                      accept="image/x-png,image/jpeg"
                      onChange={handleChange3}
                      style={{ display: "none" }}
                      multiple="true"


                    />
                    <label for="icon-button-file3">Upload</label>
                  </Box>
                </Box>
                <Box sx={style.file2img} component="img" src={imagepreview3}></Box>
              </Box>
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Button
                  onClick={() => completeProfile()}
                  variant="outlined"
                  disabled={(!file, !file2, !file3)}
                >
                  Complete
                </Button>
                <FormHelperText style={{ textAlign: "center" }}>
                  By clicking complete, you agree to the Privacy Policy.
                </FormHelperText>
              </Box>
            </FormControl>
          </FormGroup>
        </Box>
      </Container>
    </Box>
  );
}

export default withRouter(UserRegistration);
