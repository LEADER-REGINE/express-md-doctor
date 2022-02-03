import { Avatar, Rating, Typography, Box, Container, BottomNavigation, BottomNavigationAction, Paper, Button, List, ListItem, Divider, ListItemText, ListItemAvatar } from '@mui/material';
import React, { useState, useEffect } from 'react'
import firebase from '../../config/firebase';
import './css/TransactionHistory.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, getTheme } from "../../redux/actions/uiAction";
import { useHistory, useParams, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Icon from "@mui/material/Icon";
import { loadCSS } from "fg-loadcss";

export default function TransactionHistory() {
    const history = useHistory();
    const [isEmpty, setisEmpty] = useState(false);
    useEffect(() => {
        let isSubscribed = true;
        getAuth().onAuthStateChanged(function (user) {
            if (!user) {
                history.push('/login');
            }
        });
        return () => {
            isSubscribed = false;
        }
    }, []);
    const db = firebase.firestore();
    const [transactions, setTransactions] = useState({
        datas: [],
    })
    const fetchData = async () => {
        const userRef = db.collection('doctors').doc(localStorage.getItem("uid")).collection("archive").orderBy("timestamp");
        const data = await userRef.get();
        if (data.size > 0) {
            setisEmpty(false);
            let dataPayload = [];
            data.docs.forEach((onSnapshot) => {
                dataPayload.push(onSnapshot.data());
                setTransactions({ datas: dataPayload });
            });
        } else {
            setisEmpty(true);
        }

    }
    useEffect(() => {
        fetchData();
    }, []);


    //fontawesome
    React.useEffect(() => {
        const node = loadCSS(
            "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
            // Inject before JSS
            document.querySelector("#font-awesome-css") || document.head.firstChild
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const style = {
        outerCon: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },

        paperCon: {
            padding: "20px",
            minWidth: "250px"
        },

        LabelCon: {
            marginTop: "10px",
            marginLeft: "10px"
        },

        Label: {
            fontSize: "24px",
            marginTop: "5px",
            textAlign: 'center',
        }
    }
    return (
        <Box>
            <Typography className="headerStyle">
                <Icon
                    baseClassName="fas"
                    className="fas fa-notes-medical"
                    sx={{
                        fontSize: { xs: 30, md: 50 },
                        color: "primary",
                        width: 300,
                        marginTop: 2,
                    }}
                />
            </Typography>
            <Box sx={style.LabelCon}>
                <Typography sx={style.Label}>Transaction History</Typography>
            </Box>
            <Box className='transactionBox'>
                {isEmpty ?
                    <Typography variant="subtitle2">
                        There are no previous appointments.
                    </Typography>
                    :
                    <List className='transactionList'>
                        {transactions && transactions.datas.map((transactions) => {
                            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            let setDate = transactions.datetime.toDate().toLocaleDateString('en-US', options);
                            let setTime = transactions.datetime.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                            return (
                                <ListItem sx={style.outerCon}>
                                    <Link to={`/archive/${transactions.documentId}/view`}>
                                        <Box>
                                            <Paper sx={style.paperCon} elevation="5">
                                                <Typography>
                                                    Doctor Assigned: {transactions.assigned_doctor}
                                                </Typography>
                                                <Typography>
                                                    Date: {setDate}
                                                </Typography>
                                                <Typography>
                                                    Time: {setTime}
                                                </Typography>
                                            </Paper>
                                        </Box>
                                    </Link>
                                </ListItem>
                            );
                        })
                        }
                    </List>
                }
            </Box>
        </Box>
    )
}
