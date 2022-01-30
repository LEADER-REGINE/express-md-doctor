import { Box, Container, Typography, Button } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

import { useHistory, useParams } from "react-router-dom";
import SearchInterface from '../../components/appcomponents/SearchInterface';
import '../../App.css'

export default function IsNotSuccessful() {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <Box>
            <Typography>
                Edit Unsuccessful. Please try again later.
            </Typography>
            <Button variant="outlined" onClick={() => history.push("/dashboard")}>OK</Button>
        </Box >
    );
}

