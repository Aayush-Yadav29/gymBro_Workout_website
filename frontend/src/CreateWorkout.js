import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import bgImage from './img/bg.png';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const { exercises } = require('./data');


export default function CreateWorkout() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');
  const [showAlert, setshowAlert] = useState(false);
  const [title, settitle] = useState('');
  const textFieldStyle = {
    input: { color: '#ffffff' }, // Input text color
    label: { color: '#ffffff' }, // Label text color
    InputLabelProps: { color: '#ffffff' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        background: '#161a1f',
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
  const [formFields, setFormFields] = useState([{ exercise: null, sets: '', reps: '' }]);
  const handleAddExercise = () => {
    setFormFields([...formFields, { exercise: null, sets: '', reps: '' }]);
  };

  const handleRemoveExercise = (index) => {
    const updatedFormFields = [...formFields];
    updatedFormFields.splice(index, 1);
    setFormFields(updatedFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === '') {
      setshowAlert(true);
      return;
    }

    const inputList = formFields;
    const outputList = inputList.map(item => ({
      exercise: item.exercise.label,
      sets: item.sets,
      reps: item.reps
    }));
    const formData = {
      title: title,
      blocks: outputList,
    };
    // console.log(outputList);

    fetch(`${baseUrl}/api/addWorkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(formData),
      // console.log(body);
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Data sent successfully:', data);
        // Optionally, reset form fields or perform other actions after successful submission
        navigate('/Home');
      })
      .catch(error => {
        console.error('Error sending data:', error);
        // Handle error, show error message, etc.
      });


  };

  return (
    <Box
      display="flex"          // Enables flexbox on the Box component
      flexDirection="column"     // Sets the flex direction to row (horizontal)
      justifyContent="center" // Centers children horizontally
      alignItems="center"
      style={{
        // marginTop: '5%',
        // marginLeft: '3%',
        paddingTop: '120px',
        paddingLeft: '20px',
        backgroundColor: '#000000', // Dark background color
        color: '#f0f0f0', // Light text color for contrast
        minHeight: '100vh', // Ensuring full viewport height
      }}
    >
      <Box display="block" p={2}><Typography variant="h5" sx={{ mb: 2 }}>
        Create you own workout
      </Typography></Box>

      <Box>
        <TextField
          label="Title of Workout"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
          required
          InputLabelProps={{ style: { color: '#ffffff' } }}
          sx={textFieldStyle}
        />
        <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <form onSubmit={handleSubmit}>
            {formFields.map((field, index) => (
              <Box key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                <Autocomplete
                  style={{ marginRight: "10px", width: "40%" }}
                  id={`exercise-${index}`}
                  options={exercises}
                  value={field.exercise}
                  onChange={(event, newValue) => {
                    const updatedFormFields = [...formFields];
                    updatedFormFields[index].exercise = newValue;
                    setFormFields(updatedFormFields);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Exercise"
                      required
                      InputLabelProps={{ style: { color: '#ffffff' } }}
                      sx={textFieldStyle}
                    />
                  )}
                />

                <TextField
                  style={{ marginRight: '10px', width: '25%' }}
                  label="Sets"
                  value={field.sets}
                  onChange={(e) => {
                    const updatedFormFields = [...formFields];
                    updatedFormFields[index].sets = e.target.value;
                    setFormFields(updatedFormFields);
                  }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Ensures only numeric input
                  required
                  InputLabelProps={{ style: { color: '#ffffff' } }}
                  sx={textFieldStyle}
                />

                <TextField
                  style={{ width: '25%' }}
                  label="Reps"
                  value={field.reps}
                  onChange={(e) => {
                    const updatedFormFields = [...formFields];
                    updatedFormFields[index].reps = e.target.value;
                    setFormFields(updatedFormFields);
                  }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Ensures only numeric input
                  required
                  InputLabelProps={{ style: { color: '#ffffff' } }}
                  sx={textFieldStyle}
                />

                {formFields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveExercise(index)}
                    style={{ color: '#f0f0f0' }} // Light color for button icon
                  >
                    <DeleteIcon />
                  </Button>
                )}
              </Box>
            ))}

            <div style={{ display: 'flex', justifyContent: 'right' }}>
              <Button
                type="button"
                onClick={handleAddExercise}
                style={{
                  backgroundColor: '#2e2e2e', // Dark background color for button
                  color: '#f0f0f0', // Light text color
                  marginBottom: '10px',
                }}
              >
                Add Exercise
              </Button>
            </div>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'white', // Initial background color
                color: 'black', // Initial text color
                '&:hover': {
                  backgroundColor: 'gray', // Hover background color
                  color: 'white', // Hover text color
                },
              }}
            >
              Submit
            </Button>
            <Box style={{ marginTop: '20px' }}>
              {showAlert && (
                <Alert severity="error" style={{ backgroundColor: '#f44336', color: '#ffffff' }}>Enter the title of the workout.</Alert>
              )}
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  )
}
