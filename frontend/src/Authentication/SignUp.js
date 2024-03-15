import React, { useState } from 'react';
import { TextField, Button ,Box, Typography } from '@mui/material';
import { signUpUser } from './Redux/AuthSlice';
import {useDispatch} from 'react-redux';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any validation or submit data to backend
    console.log('Email:', email);
    console.log('Password:', password);
    dispatch(signUpUser({email,password}));
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
        Sign Up
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
          Sign Up
        </Button>
      </form>
    </Box>
  );
};
export default SignUp;