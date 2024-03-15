import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography,Alert} from '@mui/material';
import { loginUser } from './Redux/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //states for handling errors
  const [incorrectPassword, setincorrectPassword] = useState(false);
  const [incorrectEmail, setincorrectEmail] = useState(false);
  const [incompleteData, setincompleteData] = useState(false);
  const dispatch = useDispatch();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setincorrectPassword(false); // Reset the state before each submission
    setincorrectEmail(false);
    setincompleteData(false);
    // Here you can perform any validation or submit data to backend
    console.log('Email:', email);
    console.log('Password:', password);
    dispatch(loginUser({ email, password }))
      .then((response) => {
        const { payload } = response;
        if (payload.error) {
          console.log('Error:', payload.error);
        } else {
          const msg = payload.msg;
          console.log('from Login.js:', msg);
          if (msg == 'Incorrect password') {
            setincorrectPassword(true);
          }
          else if (msg == 'Incorrect email') {
            setincorrectEmail(true);
          }
          else if (email == '' || password == '') {
            setincompleteData(true);
          }
        }
      })
      .catch((error) => {
        console.log('Error:', error.message);
      });
    // console.log('from Login.js:', msg);

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
    
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10%'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          sx={{ width: '100%' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          sx={{ width: '100%' }}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
      {renderErrorAlert()}
    </Box>
  );
};
export default Login;