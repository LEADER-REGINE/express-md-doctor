import { Box, Container, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTheme } from "../../redux/actions/uiAction";

import SearchInterface from '../../components/appcomponents/SearchInterface';
import '../../App.css'

export default function SearchDoc() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTheme());
    }, [dispatch]);
    return (
        <Box className='base'>
            <Container className="searchContainer">
                <SearchInterface />
            </Container>
        </Box>
    )
}

