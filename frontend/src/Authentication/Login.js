import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link, Container, Avatar, Alert } from '@mui/material';
import { loginUser } from '../Redux/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [incompleteData, setIncompleteData] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          else if(msg == 'valid'){
            console.log("valid login");
            navigate('/Home');
            window.location.reload();
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

  return (
    <Container maxWidth="xs">
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
            Log In
          </Button>
          <Typography variant="body2" color="text.secondary" align="center">
            Don't have an account? <Link href="/" variant="body2">Sign Up here</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;