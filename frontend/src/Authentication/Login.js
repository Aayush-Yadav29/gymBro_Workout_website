import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link, Container, Avatar, Alert } from '@mui/material';
import { loginUser } from '../Redux/AuthSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [incompleteData, setIncompleteData] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => { return state.user.isLoading });

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
    setIncorrectPassword(false);
    setIncorrectEmail(false);
    setIncompleteData(false);

    if (email === '' || password === '') {
      setIncompleteData(true);
      return;
    }

    dispatch(loginUser({ email, password }))
      .then((response) => {
        const { payload } = response;
        if (payload.error) {
          console.log('Error:', payload.error);
        } else {
          const msg = payload.msg;
          console.log('from Login.js:', msg);
          if (msg === 'Incorrect password') {
            setIncorrectPassword(true);
          } else if (msg === 'Incorrect email') {
            setIncorrectEmail(true);
          }
          else if (msg == 'valid') {
            console.log("valid login");
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
    } else if (incorrectEmail) {
      return <Alert severity="error">Email not found</Alert>;
    } else if (incorrectPassword) {
      return <Alert severity="error">Incorrect Password</Alert>;
    }
    return null;
  };

  const enterAsGuest = () => {
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

      }}>
        {/* Form Content */}
        <Box className=""
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
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
              onClick={handleSubmit}
            >
              Log In
            </Button>
            <Button
              // type="submit"
              onClick={enterAsGuest}
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: 'white', // Initial background color
                color: 'black', // Initial text color
                '&:hover': {
                  backgroundColor: '#b6b8b6',
                  color: 'black',
                },
              }}
            >
              Enter as guest
            </Button>
            <Typography className='text-white' variant="body2" align="center">
              Don't have an account? <NavLink to="/" variant="body2">Sign Up here</NavLink>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;