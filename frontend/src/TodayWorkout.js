import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

export const TodayWorkout = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/getWorkouts/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setExercises(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchData();
  }, [id]); // Include id in the dependency array to fetch data when id changes

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="dark bg-black text-white min-h-screen flex items-center justify-center">
      <div className="container max-w-xl px-4 py-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Today's Workout</h1>
          <p className="text-muted-foreground">Get ready to crush your fitness goals!</p>
        </div>
        <div className="border-2 border-gray-800 rounded-lg overflow-hidden bg-gray-850">
          <table className="w-full text-sm">
            <thead className="bg-gray-900">
              <tr>
                <th className="p-4 text-left">Exercise</th>
                <th className="p-4 text-left">Sets</th>
                <th className="p-4 text-left">Reps</th>
              </tr>
            </thead>
            <tbody>
              {(exercises.exerciseData || []).map((row, index) => (
                <tr>
                  <td className="p-4">{row.exercise}</td>
                  <td className="p-4">{row.sets}</td>
                  <td className="p-4">{row.reps}</td>
                </tr>
              ))}

              
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
        <Link to={`/Home/TodayWorkout/${id}`} style={{ textDecoration: 'none' }}>
          <button class="bg-gray-900 border-2 border-gray-800 text-white hover:bg-white hover:text-black hover:border-2 hover:border-gray-800 font-medium py-2 px-4 rounded">
            Start Workout</button>
            </Link>
        </div>
      </div>
    </div>
  );
};
