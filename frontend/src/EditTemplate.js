import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DeleteIcon from '@mui/icons-material/Delete';

export const EditTemplate = ({titleWork,sets,reps}) => {
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
  return (
    <div>
        EditTemplate
        <Container style={{ marginTop: "20px",}}>
      <TextField
              style={{ }}
              label="Title of Workout"
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
      />
    <Container style={{ display: "flex", justifyContent: "center", marginTop: "10px"}}>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <Box key={index} style={{ display: "flex", marginBottom: "10px" }}>
            <Autocomplete
              style={{ marginRight: "10px",width : "40%"}}
              id={`exercise-${index}`}
              options={exercises}
              value={field.exercise}
              onChange={(event, newValue) => {
                const updatedFormFields = [...formFields];
                updatedFormFields[index].exercise = newValue;
                setFormFields(updatedFormFields);
              }}
              renderInput={(params) => <TextField {...params} label="Exercise" />}
            />

            <TextField
              style={{ marginRight: "10px" ,width : "25%"}}
              label="Sets"
              value={field.sets}
              onChange={(e) => {
                const updatedFormFields = [...formFields];
                updatedFormFields[index].sets = e.target.value;
                setFormFields(updatedFormFields);
              }}
            />

            <TextField
              style={{width : "25%"}}
              label="Reps"
              value={field.reps}
              onChange={(e) => {
                const updatedFormFields = [...formFields];
                updatedFormFields[index].reps = e.target.value;
                setFormFields(updatedFormFields);
              }}
            />

            {formFields.length > 1 && (
              <Button type="button" onClick={() => handleRemoveExercise(index)}>
                {/* Remove */}
                <DeleteIcon />
              </Button>
            )}
          </Box>
        ))}

        <div style={{ display: "flex", justifyContent: "right"}}>
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
      </form>
    </Container>
    </Container>
    </div>
  )
}
