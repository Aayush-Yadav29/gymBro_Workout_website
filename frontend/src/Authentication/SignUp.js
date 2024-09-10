import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link, Container, Avatar, Alert } from '@mui/material';
import { signUpUser } from '../Redux/AuthSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector } from 'react-redux';
import {CircularProgress } from '@mui/material';
import { loginUser } from '../Redux/AuthSlice';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [usedEmail, setusedEmail] = useState(false);
  const [incompleteData, setIncompleteData] = useState(false);
  const isLoading = useSelector((state)=>{return state.user.isLoading});
  const textFieldStyle = {
    input: { color: '#ffffff' }, // Input text color
    label: { color: '#ffffff' }, // Label text color
    InputLabelProps: { color: '#ffffff' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        // background: '#161a1f',
        borderColor: '#2e343d', // Default border color
      },

      '&.Mui-focused fieldset': {
        borderColor: '#ffffff', // Border color when focused
        label: { color: '#ffffff' }, // Label text color
      },
      '&:hover fieldset': {
        borderColor: '#ffffff', // Border color on hover
      },
    },
  }
  
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
  const enterAsGuest = ()=>{
    console.log("entering as guest");
    var email = process.env.REACT_APP_GUEST_EMAIL
    var password = process.env.REACT_APP_GUEST_PWD
    dispatch(loginUser({ email, password }))
  }
  if (isLoading) {
    return <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="flex justify-center items-center py-20">
        {/* {console.log("loader : ", isloading)} */}
        <span class="loader"></span>
      </div>
    </Box>
  }
  return (
    <div className='flex flex-col items-center justify-center bg-gray-950 text-white h-screen'>
    <Container className='p-8 text-white m-5' maxWidth="xs" sx={{
        // position: 'relative',  
        backgroundColor: '#0e0d21',
        border: '2px solid',
        borderColor: '#2e343d',
        borderRadius: '12px',
        // marginLeft:"5px",
        // marginRight:"5px",
      }}>
      {/* Form Content */}
      <Box
        sx={{
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
            InputLabelProps={{ style: { color: '#ffffff' } }}
              sx={textFieldStyle}
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
            InputLabelProps={{ style: { color: '#ffffff' } }}
              sx={textFieldStyle}
          />
          {renderErrorAlert()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: 'white', // Initial background color
              color: 'black', // Initial text color
              '&:hover': {
                backgroundColor: '#b6b8b6',
                  color: 'black',
              },
            }}
          >
            Sign Up
          </Button>
          <Button
            // type="submit"
            onClick={enterAsGuest}
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb:2,
              backgroundColor: 'white', // Initial background color
              color: 'black', // Initial text color
              '&:hover': {
                backgroundColor: '#b6b8b6',
                  color: 'black',
              },
            }}
            disabled={isLoading} // Optionally disable button while loading
          >
            Enter as guest
          </Button>
          <Typography className='text-white' variant="body2" align="center">
            Already have an account? <NavLink to="/Login">Sign in here</NavLink>
          </Typography>
        </Box>
      </Box>
    </Container>
    </div>
  );
};

export default SignUp;