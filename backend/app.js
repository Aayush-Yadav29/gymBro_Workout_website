const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Workout = require('./models/Workout');
const PastWorkout = require('./models/PastWorkouts');
const { ObjectId } = require('mongodb');
const userRoutes = require('./routes/user')


require('dotenv').config()

app.use(express.json()); // Middleware to parse JSON data
mongoose.connect(process.env.mongoDbURL)
    .then(()=>{
        app.listen(process.env.PORT, () =>{console.log("server running")})
})

app.get('/',(req,res)=>{
    res.send("Hi there!")
})

// routes for authentcation
app.use('/api/user', userRoutes)

// route to save a workout template
app.post('/api/addWorkout', async (req, res) => {
  try {
    // Extract data from the request body
    const { title, blocks } = req.body;

    // Create a new instance of the Workout model
    const workout = new Workout({
      title,
      exerciseData : blocks,
    });

    // Save the workout to the database
    const savedWorkout = await workout.save();

    // Send the saved workout data as a response
    res.json(savedWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to save data.");
  }
});

// route to save a workout after completing it
app.post('/api/addPastWorkout', async (req, res) => {

  try {
    // Extract data from the request body
    // console.log(req.body);
    const { date, workoutData } = req.body;

    // Create a new instance of the Workout model
    const workout = new PastWorkout({
      date,
      workoutData,
    });

    // Save the workout to the database
    const savedWorkout = await workout.save();

    // Send the saved workout data as a response
    res.json(savedWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to save data.");
  }
});

// route to send all workouts via api
app.get('/api/getWorkouts', (req, res) => {
  Workout.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// route to delete a workout
app.post('/api/deleteWorkout', async (req, res) => {
  console.log(req.body);
  try {
    const workoutId = req.body.id;

    const result = await Workout.findOneAndDelete({ _id: new ObjectId(workoutId) });

    if (result) {
      console.log('Workout deleted:', result);
      res.status(200).json({ message: 'Workout deleted successfully' });
    } else {
      console.log('Workout not found');
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//route to get details of a particular workoute
app.get('/api/getWorkouts/:id', (req,res)=>{
  const id = req.params.id;
  console.log("req here : ",id);
  Workout.findById(id)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
});

app.get('/api/getTodayWorkouts/:id', (req,res)=>{
  const id = req.params.id;
  console.log("req new : ",id);
  Workout.findById(id)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
});

  
  