import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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
      })
      .catch(error => {
        console.error('Error sending data:', error);
        // Handle error, show error message, etc.
      });

    navigate('/Home');

  };

  return (
    <Box style={{
      marginTop: '5%',
      marginLeft : '3%',
      display: 'flex',
      justifyContent: 'center',
      // backgroundImage: `url(${bgImage})`,
      // backgroundSize: 'cover',
      // backgroundPosition: 'center', backgroundAttachment: 'fixed',
      // height: '100vh'
    }}>
      <Box style={{

      }}>
        <TextField
          label="Title of Workout"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
          required
        />
        <Container style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <form onSubmit={handleSubmit}>
            {formFields.map((field, index) => (
              <Box key={index} style={{ display: "flex", marginBottom: "10px" }}>
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
                    />
                  )}
                />

                <TextField
                  style={{ marginRight: "10px", width: "25%" }}
                  label="Sets"
                  value={field.sets}
                  onChange={(e) => {
                    const updatedFormFields = [...formFields];
                    updatedFormFields[index].sets = e.target.value;
                    setFormFields(updatedFormFields);
                  }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  // Ensures only numeric input
                  required
                />

                <TextField
                  style={{ width: "25%" }}
                  label="Reps"
                  value={field.reps}
                  onChange={(e) => {
                    const updatedFormFields = [...formFields];
                    updatedFormFields[index].reps = e.target.value;
                    setFormFields(updatedFormFields);
                  }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  // Ensures only numeric input
                  required
                />

                {formFields.length > 1 && (
                  <Button type="button" onClick={() => handleRemoveExercise(index)}>
                    {/* Remove */}
                    <DeleteIcon />
                  </Button>
                )}
              </Box>
            ))}

            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                type="button"
                onClick={handleAddExercise}
              >
                Add Exercise
              </Button>
            </div>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Box style={{marginTop: '20px'}}>
              {showAlert && (
                <Alert severity="error">Enter title of the workout.</Alert>
              )}
            </Box>

          </form>
        </Container>
      </Box>

    </Box>
  )
}
