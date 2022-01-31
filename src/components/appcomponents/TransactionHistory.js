import { Avatar, Rating, Typography, Box, Container, BottomNavigation, BottomNavigationAction, Paper, Button, List, ListItem, Divider, ListItemText, ListItemAvatar } from '@mui/material';
import React, { useState, useEffect } from 'react'
import firebase from '../../config/firebase';
import './css/TransactionHistory.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, getTheme } from "../../redux/actions/uiAction";
import { useHistory, useParams, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

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
        const userRef = db.collection('doctors').doc(localStorage.getItem("uid")).collection("archive").orderBy("datetime");
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
            fontSize: "24px"
        }
    }
    return (
        <Box>
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
                            let setDate = transactions.datetime.toDate().toLocaleDateString();
                            let setTime = transactions.datetime.toDate().toLocaleTimeString();
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
