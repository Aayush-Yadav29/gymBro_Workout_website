// Carousel.js

import React, { useState ,useEffect} from 'react';
import { useParams,Link} from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import CardDisplay from './CardDisplay';
const Carousel = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [currentSlide, setCurrentSlide] = useState(0);
    const { id } = useParams();
    const [exercises, setExercises] = useState([]);
    const [newArray,setnewArray] = useState([]);
    // const newArray = exercises.exerciseData || []; // Initialize newArray as an empty array if exerciseData is undefined
    console.log(newArray);

    useEffect(() => {
        console.log("entering useefect");
        const fetchData = async () => {
            try {
                console.log("making req");
                const response = await fetch(`${baseUrl}/api/getWorkouts/${id}`);
                console.log("req made");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log("this is response for card", result);
                setExercises(result);
                setnewArray(result.exerciseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Include id in the dependency array to fetch data when id changes
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % newArray.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + newArray.length) % newArray.length);
    };


    return (
        <div>
            <CardDisplay Ex_title={newArray[currentSlide].exercise} Sets={newArray[currentSlide].sets} Reps={newArray[currentSlide].reps} CardNumber={currentSlide} TotalCards={newArray.length}/>
            <Button onClick={prevSlide} disabled={currentSlide === 0}>
                Previous
            </Button>
            <Button onClick={nextSlide} disabled={currentSlide === newArray.length - 1}>
                Next
            </Button>
        </div>
    );
};

export default Carousel;
