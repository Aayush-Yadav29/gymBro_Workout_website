import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import CardDisplay from './CardDisplay';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function CarouselWorkout() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [showNotification, setShowNotification] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const { id } = useParams();
    console.log(id);
    const [exercises, setExercises] = useState([]);
    const [newArray, setnewArray] = useState([]);
    const [check, setcheck] = useState(false);
    // const dispatch = useDispatch();
    const [showError, setShowError] = useState(false); // State to manage error visibility

    // State to manage the input value
    const [weight, setWeight] = useState('');

    // array to store weight inputs
    const [inputWeights, setInputWeights] = useState([]);
    useEffect(() => {
        console.log("newArray");
        setInputWeights(new Array(newArray.length).fill(0));
    }, [newArray]);

    // Handle changes in the input
    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };
    const nextSlide = () => {
        if (isNaN(weight)) {
            console.log("this is error");
            setShowError(true); // Show error alert
        }
        else {
            setShowError(false);
            const updatedWeights = [...inputWeights];
            updatedWeights[currentSlide] = weight;
            console.log("updating ", currentSlide, " to ", weight);
            setInputWeights(updatedWeights);
            setCurrentSlide((prev) => (prev + 1) % newArray.length);
            if (inputWeights[currentSlide + 1] != 0) {
                setWeight(inputWeights[currentSlide + 1]);
            }
            else {
                setWeight('');
            }
        }
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + newArray.length) % newArray.length);
        if (inputWeights[currentSlide - 1] != 0) {
            setWeight(inputWeights[currentSlide - 1]);
        }
        else {
            setWeight('');
        }
    };

    const onSubmit = () => {
        if (isNaN(weight)) {
            console.log("this is error");
            setShowError(true); // Show error alert
        }
        else {
            setShowError(false);
            const updatedWeights = [...inputWeights];
            updatedWeights[currentSlide] = weight;
            setInputWeights(updatedWeights);
            const workoutData = []
            let i =0;
            newArray.map(item=>{
                const obj = {
                    exercise : item.exercise,
                    sets: item.sets,
                    reps: item.reps,
                    weight: Number(updatedWeights[i])
                }
                workoutData.push(obj);
                i+=1;
            })
            const todayDate = new Date();
            const data = {date: String(todayDate),title: exercises.title ,workoutData: workoutData}
            console.log(data);
            fetch(`${baseUrl}/api/addPastWorkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(data),
                // console.log(body);
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Data sent successfully:', data);
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                });
            // console.log("inputwt", inputWeights);
            // Redirect to the home page
            setShowNotification(true);
            setTimeout(function() {
                setShowNotification(false);
                navigate('/Home');
            }, 3000);
            
            // setShowNotification(true); // Set showNotification to true after successful submission
        }
    };


    useEffect(() => {
        console.log("entering useefect");
        const fetchData = async () => {
            try {
                console.log("making req");
                const response = await fetch(`${baseUrl}/api/getWorkouts/${id}`,{
                    headers: {
                      'Authorization': token
                    }
                  });
                console.log("req made");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log("this is response for card", result);
                setExercises(result);
                setnewArray(result.exerciseData);
                setcheck(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <div>
                {check && (
                    <CardDisplay
                        Ex_title={newArray[currentSlide].exercise}
                        Sets={newArray[currentSlide].sets}
                        Reps={newArray[currentSlide].reps}
                        CardNumber={currentSlide + 1}
                        TotalCards={newArray.length}
                        prevSlide={prevSlide}
                        nextSlide={nextSlide}
                        lengthCards={newArray.length - 1}
                        currSlide={currentSlide}
                    />

                )}
                {/* Conditional rendering of error alert */}
                {showError && (
                    <Alert variant="outlined" severity="error">
                        Please enter valid weight!
                    </Alert>
                )}
                {/* {console.log("here",inputWeights)} */}
                <TextField
                    id="standard-basic"
                    label="Weight (in kg)"
                    variant="standard"
                    value={weight}
                    onChange={handleWeightChange}
                />
                <Typography variant="body1">
                    <Button onClick={prevSlide} disabled={currentSlide === 0}>
                        Previous
                    </Button>
                    <Button onClick={nextSlide} disabled={currentSlide === newArray.length - 1}>
                        Next
                    </Button>
                </Typography>
                {currentSlide + 1 === newArray.length && (
                    <Button onClick={onSubmit} variant="contained" color="success" style={{
                        display: 'block',
                        margin: 'auto', marginTop: '25px'
                    }}>
                        Submit
                    </Button>
                )}
                {/* Notification component */}
                {showNotification && (
                    
                    <Alert severity="success" onClose={() => {
                        setShowNotification(false);
                        navigate('/Home');
                        }}>
                        Congrats, your workout for today is completed and saved. See you Tomorrow !!
                    </Alert>
                )}
            </div>
        </div>
    )
}
