import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import CardDisplay from './CardDisplay';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Container, Stack, CircularProgress } from '@mui/material';
export default function CarouselWorkout() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [showNotification, setShowNotification] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const { id } = useParams();
    const [loading, setLoading] = useState(true); // Add loading state
    // console.log(id);
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
            let i = 0;
            newArray.map(item => {
                const obj = {
                    exercise: item.exercise,
                    sets: item.sets,
                    reps: item.reps,
                    weight: Number(updatedWeights[i])
                }
                workoutData.push(obj);
                i += 1;
            })
            const todayDate = new Date();
            const data = { date: String(todayDate), title: exercises.title, workoutData: workoutData }
            // console.log(data);
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
            setTimeout(function () {
                setShowNotification(false);
                navigate('/Home');
            }, 3000);

            // setShowNotification(true); // Set showNotification to true after successful submission
        }
    };


    useEffect(() => {
        // console.log("entering useefect");
        const fetchData = async () => {
            try {
                // console.log("making req");
                const response = await fetch(`${baseUrl}/api/getWorkouts/${id}`, {
                    headers: {
                        'Authorization': token
                    }
                });
                // console.log("req made");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                // console.log("this is response for card", result);
                setExercises(result);
                setnewArray(result.exerciseData);
                fetchInfo(result.exerciseData);
                // testapi();
                // console.log("res : ", result.exerciseData);
                // setcheck(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [infoArr, setInfoArr] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };
    async function fetchInfo(arr) {
        try {
            const promises = arr.map(val => apiCall(val.exercise));
            const results = await Promise.all(promises);
            setInfoArr(results);
            setcheck(true);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching info:", error);
        }
    }

    function apiCall(name) {
        // console.log("name : ",name);
        if (typeof name !== 'string' || name.trim() === '') {
            console.error('Invalid input: name must be a non-empty string');
            // return Promise.reject(new Error('Invalid input'));
        }
        const url = `https://exercisedb.p.rapidapi.com/exercises/name/${name.toLowerCase()}`;
        return fetchData(url);
    }
    // const testapi = async () => {
    //     // console.log("name : ",name);

    //     const url = 'https://exercisedb.p.rapidapi.com/exercises/name/deadlift';
    //     try {
    //         const response = await fetch(url, options);
    //         const result = await response.json();
    //         console.log("squat : ",result);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }

    // }

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
            // console.log("result : ", result);
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 2, // Adds space between items
                    padding: 5, // Adds some padding around the content
                    alignItems: 'center',
                    minHeight: '100vh', // This ensures the container takes up the full viewport height
                    bgcolor: '#0f1012', // Dark background color
                    color: '#ffffff', // Light text color
                }}
            >
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
                        cardInfo={infoArr[currentSlide]}
                    />
                )}
                {/* Conditional rendering of error alert */}
                {showError && (
                    <Alert variant="outlined" severity="error" sx={{ color: '#ff6f6f', bgcolor: '#212121' }}>
                        Please enter valid weight!
                    </Alert>
                )}
                {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                <TextField
                    id="outlined-basic"
                    label="Enter weight (in kg)"
                    variant="outlined"
                    value={weight}
                    onChange={handleWeightChange}
                    sx={{
                        input: { color: '#ffffff' }, // Input text color
                        label: { color: '#ffffff' }, // Label text color
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
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
                    }}
                />
                <Typography variant="body1" sx={{ color: '#ffffff' }}>
                    <Button
                        variant="outlined"
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        sx={{
                            marginRight: '90px',
                            color: 'white', // Text color
                            borderColor: '#2e343d', // Outline color
                            backgroundColor: '#161a1f', // Background color
                            '&:hover': {
                                backgroundColor: '#536078', // Background color on hover
                                color: 'white', // Text color on hover
                                borderColor: '#536078', // Outline color on hover
                            },
                            '&.Mui-disabled': {
                                color: '#b4b9bf', // Text color when disabled
                                borderColor: '#2f3338', // Outline color when disabled
                                backgroundColor: '#2f3338', // Background color when disabled
                            },

                        }}
                    >

                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={nextSlide}
                        disabled={currentSlide === newArray.length - 1}
                        sx={{

                            color: 'white', // Text color
                            borderColor: '#2e343d', // Outline color
                            backgroundColor: '#161a1f', // Background color
                            '&:hover': {
                                backgroundColor: '#536078', // Background color on hover
                                color: 'white', // Text color on hover
                                borderColor: '#536078', // Outline color on hover
                            },
                            '&.Mui-disabled': {
                                color: '#b4b9bf', // Text color when disabled
                                borderColor: '#2f3338', // Outline color when disabled
                                backgroundColor: '#2f3338', // Background color when disabled
                            },

                        }}
                    >
                        Next
                    </Button>
                </Typography>
                {currentSlide + 1 === newArray.length && (
                    <Button
                        onClick={onSubmit}
                        variant="contained"

                        sx={{
                            color: 'black', // Text color
                            // borderColor: '#2e343d', // Outline color
                            backgroundColor: '#ffffff', // Background color
                            '&:hover': {
                                backgroundColor: '#bbc0c7', // Background color on hover
                                color: 'black', // Text color on hover
                                // borderColor: '#536078', // Outline color on hover
                            },

                        }}
                    >
                        Submit
                    </Button>
                )}
                {/* Notification component */}
                {showNotification && (
                    <Alert
                        severity="success"
                        sx={{ color: '#81c784', bgcolor: '#1b5e20' }}
                        onClose={() => {
                            setShowNotification(false);
                            navigate('/Home');
                        }}
                    >
                        Congrats, your workout for today is completed and saved. See you Tomorrow!!
                    </Alert>
                )}
            </Box>
        </div>
    );
}
