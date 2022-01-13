import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
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
    marginTop : "20px",
    marginLeft: "20px"
  },

  subLabel: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "red"
  },
  textField: {
    width: "300px",
  },
  inputField: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center'
  },

  innerCon : {
    marginTop : "20px",
    display : "flex",
    flexDirection : "column",
    marginLeft : "30px"
  },

  innerSub : {
    fontSize : "18px",
    marginLeft : "25px",
    marginTop : "20px"
  }

}


export default function ViewRequest() {

  const { id } = useParams();

  const history = useHistory();
  const db = firebase.firestore();
  const [appointmentData, setappointmentData] = useState({
    data: [],
  });

  const fetchData = async () => {
    let isMounted = true
    const docRef = await db.collection("doctors").doc(localStorage.getItem("uid")).collection("requests").doc(id);
    let rawData = [];
    docRef.get().then((doc) => {
      rawData.push(doc.data());
      setappointmentData({ data: rawData });
    });
    isMounted = false
  };

  useEffect(() => {
    fetchData();
  }, []);

  function editRequest() {
    history.push(`${id}/edit`);
  }

  function declineRequest() {
    history.push(`${id}/decline`);
  }

  function acceptRequest() {
    var docRef = db.collection("doctors")
      .doc(localStorage.getItem("uid"))
      .collection("requests")
      .doc(id);
    var userRef = db.collection("users")
      .doc(id)
      .collection("requests")
      .doc(id);
    userRef
      .update({
        status: "Accepted",
      })
      .then((docReference) => {
        docRef
          .update({
            status: "Accepted",
          })
          .then((docRef) => {
            history.push("/success");
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

  return (
    <Box className="base">
      {
        appointmentData && appointmentData.data.map((data) => {
          let setDate = data.datetime.toDate().toLocaleDateString();
          let setTime = data.datetime.toDate().toLocaleTimeString();
          return (
            <Box>
              <Box>
                <Typography sx = {style.label}>Review Requests</Typography>
              </Box>
              <Box sx = {style.innerCon}>
                <Typography variant = "subtitle1">Name: {data.userFullName}</Typography>
                <Typography variant = "subtitle1">Date: {setDate}</Typography>
                <Typography variant = "subtitle1">Time: {setTime}</Typography>
                <Typography variant = "subtitle1">Gender: {data.gender}</Typography>
                <Typography variant = "subtitle1">Location: {data.location}</Typography>
              </Box>
              <Box>
                <Typography sx = {style.innerSub}>What do I feel:</Typography>
                <TextField inputProps={{ readOnly: true, }} value={data.feel} sx={style.textField}></TextField>
              </Box>
              <Box>
                <Typography>Symptoms: {data.symptoms}</Typography>
                <Typography>Any Others?: {data.others}</Typography>
              </Box>
              <Box>
                <Typography>Status: {data.status}</Typography>
              </Box>

              {(() => {
                switch (data.status) {
                  case "Pending":
                    return (
                      <Box>
                        <Button variant="contained" onClick={() => acceptRequest()}>Accept</Button>
                        <Button variant="contained" onClick={() => declineRequest()}>Decline</Button>
                        <Button variant="outlined" onClick={() => editRequest()}>Change Time or Date</Button>
                      </Box>
                    );
                  case "Edited":
                    return null;
                  case "Accepted":
                    return (
                      <Box>
                        <Button variant="contained">Complete Appointment</Button>
                        <Button variant="outlined">Cancel Appointment</Button>
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
