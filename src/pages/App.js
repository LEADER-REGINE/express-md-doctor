import { Typography, Box, Container, Button, Paper } from "@mui/material";
import Nav from "../components/appcomponents/Nav";
import TopPhoto from "../assets/Drawkit-Vector-Illustration-Medical-01 1.png";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTheme } from "../redux/actions/uiAction";
import Ticker from "react-ticker";
import CampaignIcon from "@mui/icons-material/Campaign";
import category from "../assets/child 1.png";
import doctorPhoto from "../assets/doctor 1.png";
import { Link, useHistory } from "react-router-dom";
import firebase from '../config/firebase';
const style = {
  requestBtn: {
    borderColor: "white",
  },

  textBtn: {
    display: "flex",
    flexWrap: "wrap",
    fontSize: "14px",
    color: "white",
    padding: "15px",
    textAlign: "center",
  },

  topPhoto: {
    height: "150px",
    width: "110px",
    marginLeft: "10px",
  },

  topContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  paperContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#16C2D5",
  },

  wrapper: {
    marginTop: "30px",
    maxHeight: "80px",
    display: "flex",
    overflowX: "auto",
    "-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
  },

  categoryPaper: {
    minWidth: "200px",
    height: "80px",
    borderColor: "#7EB6BC",
    borderWidth: "2px",
    marginRight: "20px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
  },

  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  category: {
    height: "50px",
    width: "50px",
    alignItems: "center",
    padding: "5px",
    borderRadius: "3px",
  },
  categoryText: {
    fontSize: "14px",
    marginLeft: "8px",
  },

  label: {
    marginTop: "20px",
  },

  upcommingReq : {
    padding: "20px",
    borderColor: "#7EB6BC",
    borderWidth: "2px",
  }
};

export default function App() {
  const [isReqEmpty, setisReqEmpty] = useState(false);
  const [isupcomingEmpty, setisUpcomingEmpty] = useState(false);
  const history = useHistory();
  const db = firebase.firestore();
  const [fetchPendingAppointments, setfetchPendingAppointments] = useState({
    appointments: [],
  })

  const [fetchUpcomingAppointments, setfetchUpcomingAppointments] = useState({
    appointments: [],
  })

  const fetchReqList = async () => {
    const userRef = db.collection('doctors').doc(localStorage.getItem("uid")).collection("requests").where("status", "==", "Pending");
    userRef.onSnapshot((doc) => {
      if (doc.size != 0) {
        setisReqEmpty(false);
        userRef.onSnapshot((doc) => {
          let getPendingAppointment = [];
          doc.forEach((req) => {
            getPendingAppointment.push(req.data());
          });
          setfetchPendingAppointments({ appointments: getPendingAppointment });
        })
      } else {
        // doc.data() will be undefined in this case
        setisReqEmpty(true);
      }
    });
  }
  const fetchUpcomingList = async () => {
    const userRef = db.collection('doctors').doc(localStorage.getItem("uid")).collection("requests").where("status", "==", "Accepted");
    userRef.onSnapshot((doc) => {
      if (doc.size != 0) {
        setisUpcomingEmpty(false);
        userRef.onSnapshot((doc) => {
          let getUpcomingAppointment = [];
          doc.forEach((req) => {
            getUpcomingAppointment.push(req.data());
          });
          setfetchUpcomingAppointments({ appointments: getUpcomingAppointment });
        })
      } else {
        // doc.data() will be undefined in this case
        setisUpcomingEmpty(true);
      }
    });
  }
  useEffect(() => {
    fetchReqList();
    fetchUpcomingList();
  }, []);


  return (
    <Box className="base">
      <Container>
        <Box className="schedBox">
          <Container>
            <Paper elevation={3} className="schedPaper">
              <Typography className="schedHeader" variant="h6">
                New Requests
              </Typography>
              <Box className="schedDetails">
                {isReqEmpty ?
                  <Typography className="schedText" variant="subtitle2">
                    There are no new requests.
                  </Typography>
                  :
                  fetchPendingAppointments.appointments.map((setappointment) => {
                    let setDate = setappointment.datetime.toDate().toLocaleDateString();
                    let setTime = setappointment.datetime.toDate().toLocaleTimeString();
                    return (
                      <Link key={setappointment.userID} to={`view/${setappointment.userID}`}>
                        <Paper sx = {style.upcommingReq} variant="outlined" >
                          <Typography variant="subtitle2">Name:{setappointment.userFullName}</Typography>
                          <Typography variant="subtitle2">Date:{setDate}</Typography>
                          <Typography variant="subtitle2">Time:{setTime}</Typography>
                          <Typography variant="subtitle2">Location:{setappointment.location}</Typography>
                        </Paper>
                      </Link>
                    )
                  })
                }
              </Box>
            </Paper>
          </Container>
        </Box>
        <Box className="schedBox">
          <Container>
            <Paper elevation={3} className="schedPaper">
              <Typography className="schedHeader" variant="h6">
                Upcoming Appointments
              </Typography>
              <Box className="schedDetails">

                {isupcomingEmpty ?
                  <Typography className="schedText" variant="subtitle2">
                    There are no upcoming appointments.
                  </Typography>
                  :
                  fetchUpcomingAppointments.appointments.map((upcomingAppointment) => {
                    let setDate = upcomingAppointment.datetime.toDate().toLocaleDateString();
                    let setTime = upcomingAppointment.datetime.toDate().toLocaleTimeString();
                    return (
                      <Link key={upcomingAppointment.userID} to={`view/${upcomingAppointment.userID}`}>
                        <Paper sx = {style.upcommingReq} variant="outlined">
                          <Typography variant="subtitle1">Name: {upcomingAppointment.userFullName}</Typography>
                          <Typography variant="subtitle1">Date: {setDate}</Typography>
                          <Typography variant="subtitle1">Time: {setTime}</Typography>
                          <Typography variant="subtitle1">Location: {upcomingAppointment.location}</Typography>
                        </Paper>
                      </Link>
                    )
                  })
                }
              </Box>
            </Paper>
          </Container>
        </Box>
      </Container>
    </Box>
  );
}
