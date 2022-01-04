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
import { NavLink } from "react-router-dom";

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
};

export default function App() {

  return (
    <Box className="base">
      <Container>
        <Box className="schedBox">
          <Container>
            <Paper elevation={3} className="schedPaper">
              <Typography className="schedHeader" variant="h6">
                Upcoming Appointments
              </Typography>
              <Box className="schedDetails">
                <Typography className="schedText" variant="subtitle2">
                  There are no upcoming appointments.
                </Typography>
              </Box>
            </Paper>
          </Container>
        </Box>

        <Box sx={style.label}>
          <Typography variant="h6">Doctor Category</Typography>
        </Box>
        <Box sx={style.wrapper}>
          <Paper sx={style.categoryPaper} variant="outlined">
            <Box sx={style.item}>
              <Box
                component="img"
                src={doctorPhoto}
                alt=""
                sx={style.category}
                style={{ backgroundColor: "#FFC107" }}
              ></Box>
              <Typography variant="subtitle2" sx={style.categoryText}>
                General Doctor
              </Typography>
            </Box>
          </Paper>
          <Paper sx={style.categoryPaper} variant="outlined">
            <Box sx={style.item}>
              <Box
                component="img"
                src={category}
                alt=""
                sx={style.category}
                style={{ backgroundColor: "#65A4DA" }}
              ></Box>
              <Typography variant="subtitle2" sx={style.categoryText}>
                Pediatrics
              </Typography>
            </Box>
          </Paper>
          {/* <Paper sx = {style.categoryPaper} variant = "outlined">
                    <Box sx = {style.item}>
                        <Typography variant="subtitle2" sx = {style.categoryText}>Pediatrics</Typography>
                    </Box>
                    </Paper>
                    <Paper sx = {style.categoryPaper} variant = "outlined">
                    <Box sx = {style.item}>
                    category 4
                    </Box>
                    </Paper> */}
        </Box>
      </Container>
    </Box>
  );
}
