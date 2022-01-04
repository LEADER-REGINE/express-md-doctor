import { Avatar, Rating, Typography, Box, Container, BottomNavigation, BottomNavigationAction, Paper, Button } from '@mui/material'
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import firebase from '../../config/firebase';
import {
    useParams
} from "react-router-dom";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Link } from 'react-router-dom';
import '../App/DocProfile.css'

export default function DocProfile() {
    const [value, setValue] = useState(0);
    const { id } = useParams();

    const db = firebase.firestore();
    const [doctorProfile, setdoctorProfile] = useState({
        profile: [],
    });

    const fetchData = async () => {
        let isMounted = true
        const docRef = await db.collection("doctors").doc(id);
        let docProfile = [];
        docRef.get().then((doc) => {
            docProfile.push(doc.data());
            setdoctorProfile({ profile: docProfile });
        });
        isMounted = false
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box className='base'>
            <Container className='container'>
                <Box>
                    {doctorProfile &&
                        doctorProfile.profile.map((docProfile) => {
                            return (
                                <Box className="docProfileBox" key={docProfile.phoneNum}>
                                    <Box>
                                        <Box>
                                            <img className="docImg" alt={docProfile.lastname} src={docProfile.photoURL} />
                                        </Box>
                                        <Box className="docDetails">
                                            <Typography>Specialty: {docProfile.type}</Typography>
                                            <Typography>Location: {docProfile.location}</Typography>
                                            <Typography>Phone Number: {docProfile.phoneNum}</Typography>
                                            <Button variant="outlined">Request Appointment</Button>
                                        </Box>
                                    </Box>
                                    <Box className="docName">
                                        <Typography variant="h4" className="docDeets">{docProfile.lastname}, {docProfile.firstname} {docProfile.middleInitials}.</Typography>
                                        <Typography variant="h5" className="docDeets">{docProfile.type}</Typography>
                                    </Box>
                                    <Box className="docDetails2">
                                        <Typography>Specialty: {docProfile.type}</Typography>
                                        <Typography>Location: {docProfile.location}</Typography>
                                        <Typography>Phone Number: {docProfile.phoneNum}</Typography>

                                        <Link to={`${id}/request`}>
                                            <Button variant="outlined">
                                                Request Appointment
                                            </Button>
                                        </Link>


                                    </Box>
                                    <Box className="starsRating">
                                        <Rating
                                            name="text-feedback"
                                            value="5"
                                            readOnly
                                            precision={0.5}
                                            icon={<StarRoundedIcon />}
                                            emptyIcon={<StarRoundedIcon />}
                                        />
                                    </Box>
                                </Box>
                            );
                        })}
                </Box>

                <Box className='reviewBox'>

                    <List className='reviewList'>
                        <Typography variant="h6" alignItems="flex-start">Reviews</Typography>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Marcy Bunag" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<React.Fragment>
                                    <Rating
                                        name="text-feedback"
                                        value="5"
                                        readOnly
                                        precision={0.5}
                                        icon={<StarRoundedIcon />}
                                        emptyIcon={<StarRoundedIcon />}

                                    />
                                </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Marcy Bunag
                                        </Typography>
                                        {" — Bartz Eytin"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Regine Manuel" src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<React.Fragment>
                                    <Rating
                                        name="text-feedback"
                                        value="5"
                                        readOnly
                                        precision={0.5}
                                        icon={<StarRoundedIcon />}
                                        emptyIcon={<StarRoundedIcon />}

                                    />
                                </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Regine Manuel
                                        </Typography>
                                        {" — Malakas maging doctor"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Jay Ron Mendoza" src="/static/images/avatar/3.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<React.Fragment>
                                    <Rating
                                        name="text-feedback"
                                        value="5"
                                        readOnly
                                        precision={0.5}
                                        icon={<StarRoundedIcon />}
                                        emptyIcon={<StarRoundedIcon />}

                                    />
                                </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Jay Ron Mendoza
                                        </Typography>
                                        {' — best doctor in town'}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </Box>

            </Container >

        </Box >
    )
}
