// components/Parallax.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import backgroundImage from './images/h1_hero.png';

const Parallax = () => {
    const parallaxStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1px',
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        color: '#fff',
        padding: '50px',
        backgroundColor: 'rgba(0,0,0,0.5)',
    };

    return (
        <Box style={parallaxStyle}>
            <Box style={contentStyle}>
                <Typography variant="h2" gutterBottom>
                    Welcome
                </Typography>
                <Typography variant="body1">
                    Scroll down for more
                </Typography>
            </Box>
        </Box>
    );
};

export default Parallax;