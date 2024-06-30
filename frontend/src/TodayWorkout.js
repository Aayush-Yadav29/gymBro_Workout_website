import React, { useState, useEffect } from 'react';
import { useParams,Link} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export const TodayWorkout = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [exercises, setExercises] = useState([]);
    const newArray = exercises.exerciseData || []; // Initialize newArray as an empty array if exerciseData is undefined

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/getWorkouts/${id}`,{
                    headers: {
                      'Authorization': token
                    }
                  });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log("this is response", result);
                setExercises(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Include id in the dependency array to fetch data when id changes

    return (
        <div className='new
        '>
            TodayWorkout
            <TableContainer component={Paper}>
                <Table sx={{width: '80%'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Exercises</TableCell>
                            <TableCell align="center">Sets</TableCell>
                            <TableCell align="center">Reps</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newArray.map((row) => (
                            <TableRow
                                key={row.name} // Make sure to use a unique key
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.exercise}</TableCell>
                                <TableCell align="center">{row.sets}</TableCell>
                                <TableCell align="center">{row.reps}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to={`/Home/TodayWorkout/${id}`}>
            <Button variant="contained" color="success" style={{ display: 'block',
    margin: 'auto', marginTop: '25px'}}>
                start workout
            </Button>
            </Link>
        </div>
    );
};
