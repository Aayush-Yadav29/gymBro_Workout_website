import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link, Container, Avatar, Alert } from '@mui/material';
import { signUpUser } from '../Redux/AuthSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector } from 'react-redux';
import {CircularProgress } from '@mui/material';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [usedEmail, setusedEmail] = useState(false);
  const [incompleteData, setIncompleteData] = useState(false);
  const isLoading = useSelector((state)=>{return state.user.isLoading});

  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
        setIncompleteData(true);
        return;
      }
  
    // console.log('Email:', email);
    // console.log('Password:', password);
    dispatch(signUpUser({ email, password }))
    .then((response) => {
        const { payload } = response;
        if (payload.error) {
          console.log('Error:', payload.error);
        } else {
          const msg = payload.msg;
          console.log('from signup.js:', msg);
          if (msg === 'Email already in use') {
            setusedEmail(true);
          }
          else if(msg == 'valid'){
            // navigate('/Home');
            // window.location.reload();
          } 
        }
      })
      .catch((error) => {
        console.log('Error:', error.message);
      });
  };
  const renderErrorAlert = () => {
    if (incompleteData) {
      return <Alert severity="error">Please fill all the fields.</Alert>;
    } else if (usedEmail) {
      return <Alert severity="error">Email already in use.</Alert>;
    } 
    return null;
  };

  return (
    <Container maxWidth="xs" sx={{ position: 'relative' }}>
      {/* Loader Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            zIndex: 10, // Ensures the loader is on top
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {/* Form Content */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          {renderErrorAlert()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" color="text.secondary" align="center">
            Already have an account? <NavLink to="/Login">Sign in here</NavLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;