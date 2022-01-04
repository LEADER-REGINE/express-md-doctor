import { Typography, Box, Container, IconButton } from '@mui/material'
import React from 'react'
import '../App.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
    return (
        <Box className="footer">
            <Container className="footerContainer">
<Typography >Follow us on: 
    <IconButton
                            size="large"
                           
color='secondary'
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            color='secondary'
                        >
                            <TwitterIcon/>
                        </IconButton>
                        <IconButton
                            size="large"
                            color='secondary'
                           
                        >
                            <InstagramIcon/>
                        </IconButton>
                        </Typography>
                <Typography>©ExpressMD 2021</Typography>
            </Container>
        </Box>
    )
}
