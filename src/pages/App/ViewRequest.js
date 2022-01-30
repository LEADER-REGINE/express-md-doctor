import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, Avatar } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { useParams, useHistory } from "react-router-dom";
import firebase from '../../config/firebase';

const style = {
  parentCon: {
    display: "flex",
    margin: "20px",
    alignItems: "center"

  },
  label: {
    fontSize: "24px",
    marginTop: "20px",
    marginLeft: "20px"
  },

  subLabel: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "red"
  },
  textField: {
    width: "350px",
  },
  inputField: {
    display: "flex",
    marginLeft: "45px",
    marginRight: "45px",
    justifyContent: "center",
    marginTop: "10px"
  },

  innerCon: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    marginLeft: "30px",
    alignItems: "center",

  },

  innerSub: {
    fontSize: "24px",
    marginLeft: "25px",
    marginTop: "20px",
  },

  patientProf: {
    width: "90px",
    height: "90px",
    borderRadius: "90px"
  },

  superInnerCon: {
    marginLeft: "30px"
  },

  syntCon: {
    marginLeft: "25px"
  },

  btnBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: "20px"
  },
  textFieldBotInput: {
    fontSize: "13px",
  },
  otherSynCon: {
    display: "flex",
    marginLeft: "20px",
    marginRight: "40px",
    marginTop: "10px",
    marginBottom: "50px"
  },
  otherSyn: {
    width: "408px"
  },

  btn: {
    width: "200px",
    marginBottom: "10px",
    borderRadius: "10px"
  }


}


export default function ViewRequest() {

  const { id } = useParams();

  const history = useHistory();
  const db = firebase.firestore();
  const [appointmentData, setappointmentData] = useState({
    data: [],
  });

  const [docProfile, setdocProfile] = useState({
    profile: [],
  })
  const fetchList = async () => {
    const userRef = db.collection('doctors').doc(localStorage.getItem("uid"));
    let usrProfile = [];
    userRef.get().then(doc => {
      usrProfile.push(doc.data());
      setdocProfile({ profile: usrProfile });
    })
  }

  const [userProfile, setuserProfile] = useState({
    profile: [],
  })
  const fetchUser = async () => {
    const userRef = db.collection('users').doc(id);
    let usrProfile = [];
    userRef.get().then(doc => {
      usrProfile.push(doc.data());
      setuserProfile({ profile: usrProfile });
    })
  }



  const fetchData = async () => {
    let isMounted = true
    const docRef = await db.collection("requests").doc(id);
    let rawData = [];
    docRef.get().then((doc) => {
      rawData.push(doc.data());
      setappointmentData({ data: rawData });
    });
    isMounted = false
  };

  useEffect(() => {
    fetchList();
    fetchUser();
    fetchData();
  }, []);

  function editRequest() {
    history.push(`${id}/edit`);
  }

  function declineRequest() {
    history.push(`${id}/decline`);
  }

  function acceptRequest() {
    docProfile.profile.map((data) => {
      let docName = data.lastname + ", " + data.firstname + " " + data.middleInitials;
      let photoURL = data.photoURL;
      let location = data.location;
      let fee = data.price;
      let fname = data.firstname;
      let lname = data.lastname;
      let middle = data.middleInitials;
      userProfile.profile.map((data2) => {
        var userRef = db.collection("users")
          .doc(id)
          .collection("requests")
          .doc(id);
        var globalRef = db.collection("requests")
          .doc(id);
        userRef.collection("bidders").doc(localStorage.getItem("uid")).get().then((doc) => {
          if (doc.exists) {
            alert("You can only bid once. Please wait for the patient to accept your bid.");
          } else {
            userRef
              .collection("bidders")
              .doc(localStorage.getItem("uid"))
              .set({
                docName: docName,
                fname: fname,
                lname: lname,
                middle: middle,
                docID: localStorage.getItem("uid"),
                bid_time: new Date(),
                photoURL: photoURL,
                location: location,
                fee: fee,
              })
              .then((docReference) => {
                globalRef
                  .collection("bidders")
                  .doc(localStorage.getItem("uid"))
                  .set({
                    docName: docName,
                    fname: fname,
                    lname: lname,
                    middle: middle,
                    docID: localStorage.getItem("uid"),
                    bid_time: new Date(),
                    photoURL: photoURL,
                    location: location,
                    fee: fee,
                  })
                  .then((docRef) => {
                    history.push(`/success/${"accepted"}`);
                  })
                  .catch((error) => {
                    console.log(error);
                    history.push("/sorry");
                  });
              })
              .catch((error) => {
                console.log(error);
                history.push("/sorry");
              });
          }
        })

      })
    })
  }

  function completeRequest() {
    var docRefMove = db.collection("doctors")
      .doc(localStorage.getItem("uid"))
      .collection("archive");
    var userRefMove = db.collection("users")
      .doc(id)
      .collection("archive");
    var globalRefMove = db.collection("reqArchive");
    var docRefDelete = db.collection("doctors")
      .doc(localStorage.getItem("uid"))
      .collection("requests")
      .doc(id);
    var userRefDelete = db.collection("users")
      .doc(id)
      .collection("requests")
      .doc(id);
    var globalRefDelete = db.collection("requests").doc(id);

    var globalReq = db.collection("reqArchive").doc(id);
    appointmentData.data.map((data) => {
      let payment = data.fee;
      userProfile.profile.map((data2) => {
        let paid = data2.coins - payment;
        userRefMove
          .add({
            feel: data.feel,
            symptoms: data.symptoms,
            others: data.others,
            assigned_doctor: data.assigned_doctor,
            doctorId: data.doctorId,
            userID: data.userID,
            userFullName: data.userFullName,
            datetime: data.datetime,
            gender: data.gender,
            location: data.location,
            phoneNumber: data.phoneNumber,
            photoURL: data.photoURL,
            status: "Completed",
            rated: false,
            fee: data.fee,
          })
          .then((docReference) => {
            localStorage.setItem("docRef", docReference.id);
            userRefMove
              .doc(docReference.id)
              .update({
                documentId: docReference.id,
              })
              .then((doc1) => {
                docRefMove.doc(localStorage.getItem("docRef"))
                  .set({
                    feel: data.feel,
                    symptoms: data.symptoms,
                    others: data.others,
                    assigned_doctor: data.assigned_doctor,
                    doctorId: data.doctorId,
                    userID: data.userID,
                    userFullName: data.userFullName,
                    datetime: data.datetime,
                    gender: data.gender,
                    location: data.location,
                    phoneNumber: data.phoneNumber,
                    photoURL: data.photoURL,
                    status: "Completed",
                    rated: false,
                    fee: data.fee,
                    documentId: localStorage.getItem("docRef"),
                  })
                  .then((docRef) => {
                    globalRefMove.doc(localStorage.getItem("docRef"))
                      .set({
                        feel: data.feel,
                        symptoms: data.symptoms,
                        others: data.others,
                        assigned_doctor: data.assigned_doctor,
                        doctorId: data.doctorId,
                        userID: data.userID,
                        userFullName: data.userFullName,
                        datetime: data.datetime,
                        gender: data.gender,
                        location: data.location,
                        phoneNumber: data.phoneNumber,
                        photoURL: data.photoURL,
                        status: "Completed",
                        rated: false,
                        fee: data.fee,
                        documentId: localStorage.getItem("docRef"),
                      })
                      .then((docRef) => {
                        db.collection("users").doc(id)
                          .update({
                            coins: paid,
                          }).then((docRef3) => {
                            db.collection("doctors").doc(localStorage.getItem("uid")).get().then((doc4) => {
                              let exisCred = parseInt(doc4.data().credits);
                              let userFee = parseInt(data.fee);
                              let newCredits = parseInt(exisCred + userFee);

                              db.collection("doctors").doc(localStorage.getItem("uid"))
                                .update({
                                  credits: newCredits,
                                })
                                .then((doc5) => {
                                  docRefDelete.delete().then(() => {
                                    userRefDelete.delete().then(() => {
                                      globalRefDelete.collection("bidders").doc(localStorage.getItem("uid")).delete().then(() => {
                                        userRefDelete.collection("bidders").doc(localStorage.getItem("uid")).delete().then(() => {
                                          globalRefDelete.delete().then(() => {
                                            history.push(`/success/${"completed"}`);
                                          }).catch((error) => {
                                            console.error("Error removing document: ", error);
                                            history.push("/sorry");
                                          });
                                        }).catch((error) => {
                                          console.error("Error removing document: ", error);
                                          history.push("/sorry");
                                        });
                                      }).catch((error) => {
                                        console.error("Error removing document: ", error);
                                        history.push("/sorry");
                                      });
                                    }).catch((error) => {
                                      console.error("Error removing document: ", error);
                                      history.push("/sorry");
                                    });
                                  }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                    history.push("/sorry");
                                  });
                                })

                            })
                          })
                      })
                      .catch((error) => {
                        console.log(error);
                        history.push("/sorry");
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    history.push("/sorry");
                  });
              })
              .catch((error) => {
                console.log(error);
                history.push("/sorry");
              });

          })
          .catch((error) => {
            console.log(error);
            history.push("/sorry");
          });
      })

    })
  }

  return (
    <Box className="base">
      {
        appointmentData && appointmentData.data.map((data) => {
          let setDate = data.datetime.toDate().toLocaleDateString();
          let setTime = data.datetime.toDate().toLocaleTimeString();
          return (
            <Box>
              <Box>
                <Typography sx={style.label}>Review Requests</Typography>
              </Box>
              {/* <Box>
                <Box component = "img" alt="Image of Patient"  sx = {style.patientProf}src={data.photoURL} />
              </Box> */}
              <Box sx={style.innerCon}>
                <Box>
                  <Box component="img" alt="Image of Patient" sx={style.patientProf} src={data.photoURL} />
                </Box>
                <Box sx={style.superInnerCon}>
                  <Typography variant="subtitle1">Name: {data.userFullName}</Typography>
                  <Typography variant="subtitle1">Date: {setDate}</Typography>
                  <Typography variant="subtitle1">Time: {setTime}</Typography>
                  <Typography variant="subtitle1">Gender: {data.gender}</Typography>
                  <Typography variant="subtitle1">Location: {data.location}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography sx={style.innerSub}>What do I Feel:</Typography>
                <Box sx={style.inputField}>
                  <TextField inputProps={{ readOnly: true, }}
                    value={data.feel}
                    sx={style.textField}
                    variant="outlined"
                    multiline
                    maxRows={10}
                    minRows={5}
                  ></TextField>
                </Box>
              </Box>
              <Box sx={style.syntCon}>
                <Typography>Any Symptoms: {data.symptoms}</Typography>
                <Box>
                  <Typography sx={style.textFieldBotInput}>Others?:</Typography>
                </Box>
                <Box sx={style.otherSynCon}>
                  <TextField variant="standard" inputProps={{ readOnly: true, }} sx={style.otherSyn} value={data.others} ></TextField>
                </Box>
              </Box>
              <Box>
                <Typography>Status: {data.status}</Typography>
              </Box>

              {(() => {
                switch (data.status) {
                  case "Requested Cancellation":
                    return (
                      <Box sx={style.btnBox}>
                        <Box>
                          <Typography sx={style.innerSub}>Reason for Cancellation:</Typography>
                          <Box sx={style.inputField}>
                            <TextField inputProps={{ readOnly: true, }}
                              value={data.reason}
                              sx={style.textField}
                              variant="outlined"
                              multiline
                              maxRows={10}
                              minRows={5}
                            ></TextField>
                          </Box>
                        </Box>
                        <Button variant="outlined" sx={style.btn} onClick={() => declineRequest()}>Cancel Appointment</Button>
                      </Box>
                    );
                  case "Waiting":
                    return (
                      <Box sx={style.btnBox}>
                        <Button variant="contained" sx={style.btn} onClick={() => acceptRequest()}>Accept</Button>
                      </Box>
                    );
                  case "Edited":
                    return null;
                  case "Accepted":
                    return (
                      <Box sx={style.btnBox}>
                        <Button variant="contained" sx={style.btn} onClick={() => completeRequest()}>Complete</Button>
                        <Button variant="contained" sx={style.btn} style={{ backgroundColor: "#FF5956" }} onClick={() => declineRequest()}>Cancel Appointment</Button>
                      </Box>
                    );
                  case "Declined":
                    return null;
                  default:
                    return null;
                }
              })()}
            </Box>
          );
        })
      }

    </Box>
  );
}
