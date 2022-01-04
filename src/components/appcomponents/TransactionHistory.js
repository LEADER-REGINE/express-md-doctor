import { Avatar, Rating, Typography, Box, Container, BottomNavigation, BottomNavigationAction, Paper, Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import firebase from '../../config/firebase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import './css/TransactionHistory.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, getTheme } from "../../redux/actions/uiAction";

export default function TransactionHistory() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);

    const db = firebase.firestore();
    const [transactions, setTransactions] = useState({
        datas: [],
    })
    const fetchData = async () => {
        const userRef = db.collection('users').doc(localStorage.getItem("uid")).collection("transactions");
        const data = await userRef.get();
        let dataPayload = [];
        data.docs.forEach((onSnapshot) => {
            dataPayload.push(onSnapshot.data());
            setTransactions({ datas: dataPayload });
        });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Box>
            <Typography>Transaction History</Typography>
            <Box className='transactionBox'>

                <List className='transactionList'>
                    {transactions && transactions.datas.map((transactions) => {
                        return (
                            <ListItem key={transactions.transaction_ID}>
                                <Paper>
                                    <ListItemText
                                        primary={<React.Fragment>
                                            <Typography>
                                                Date: {transactions.transaction_Date}
                                            </Typography>
                                        </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography>
                                                    Doctor Assigned: {transactions.assigned_doctor}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </Paper>

                            </ListItem>
                        );
                    })
                    }

                </List>
            </Box>
        </Box>
    )
}
