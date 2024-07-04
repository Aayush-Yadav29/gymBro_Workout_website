import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box, Paper, CssBaseline } from '@mui/material';

const LandingPage = () => {
    return (
        <>
            <CssBaseline />
            {/* <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Gym Name
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                </Toolbar>
            </AppBar> */}

            <Box
                sx={{
                    backgroundImage: 'url("https://t4.ftcdn.net/jpg/03/50/81/89/360_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg")', // Replace with your image URL
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#fff',
                    height: '90vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: 4,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: 4,
                        borderRadius: '10px',
                    }}
                >
                    <Typography variant="h2" gutterBottom>
                        Achieve Your Fitness Goals
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Join us to start your transformation journey today!
                    </Typography>
                    <Button variant="contained" color="primary" size="large">
                        Get Started
                    </Button>
                </Box>
            </Box>

            <Container sx={{ paddingY: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Why Choose Us
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                            <img src="https://via.placeholder.com/300" alt="Feature 1" style={{ width: '100%', borderRadius: '10px' }} />
                            <Typography variant="h6" gutterBottom>
                                State-of-the-Art Equipment
                            </Typography>
                            <Typography variant="body1">
                                Experience the latest in fitness technology and equipment.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                            <img src="https://via.placeholder.com/300" alt="Feature 2" style={{ width: '100%', borderRadius: '10px' }} />
                            <Typography variant="h6" gutterBottom>
                                Professional Trainers
                            </Typography>
                            <Typography variant="body1">
                                Get guidance from certified and experienced trainers.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                            <img src="https://via.placeholder.com/300" alt="Feature 3" style={{ width: '100%', borderRadius: '10px' }} />
                            <Typography variant="h6" gutterBottom>
                                Community Support
                            </Typography>
                            <Typography variant="body1">
                                Be a part of a supportive and motivating fitness community.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Box
                sx={{
                    paddingY: 4,
                    backgroundColor: 'grey.900',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Gym Name
                </Typography>
                <Typography variant="body2">
                    © 2024 Gym Name. All rights reserved.
                </Typography>
            </Box>
        </>
    );
};

export default LandingPage;
