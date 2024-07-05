const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Workout = require('./models/Workout');
const PastWorkout = require('./models/PastWorkouts');
const { ObjectId } = require('mongodb');
const userRoutes = require('./routes/user')
const cors = require('cors');
const verifyToken = require('./middlewares/verifyToken');

require('dotenv').config()
app.use(cors());

// Or enable CORS for specific origins
const allowedOrigins = ['http://localhost:3000','https://gymbro-i3ag.onrender.com'];
app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json()); // Middleware to parse JSON data
mongoose.connect(process.env.mongoDbURL)
    .then(()=>{
        app.listen(process.env.PORT, () =>{console.log("server is running")})
})




// routes for authentcation
app.use('/api/user', userRoutes)

// Routes that require authentication
// route to save a workout template
app.post('/api/addWorkout', verifyToken,async (req, res) => {
  try {
    // Extract data from the request body
    const { title, blocks } = req.body;
    const user_id = req.user._id;
    // console.log("user id: ",req.user);
    // Create a new instance of the Workout model
    const workout = new Workout({
      title,
      user_id,
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
app.post('/api/addPastWorkout', verifyToken,async (req, res) => {

  try {
    // Extract data from the request body
    // console.log(req.body);
    const { date, title,workoutData } = req.body;
    const user_id = req.user._id;
    // Create a new instance of the Workout model
    const workout = new PastWorkout({
      date,
      title,
      workoutData,
      user_id
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
app.get('/api/getWorkouts',verifyToken,(req, res) => {
  const user_id = req.user._id;
  Workout.find({user_id})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// route to send all past workouts via api
app.get('/api/getPastWorkout',verifyToken,(req, res) => {
  const user_id = req.user._id;
  PastWorkout.find({user_id})
    .sort({ createdAt: -1 })  // Sort by createdAt field in descending order
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

// route to delete a workout
app.post('/api/deleteWorkout', verifyToken,async (req, res) => {
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
app.get('/api/getWorkouts/:id', verifyToken,(req,res)=>{
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

app.get('/api/getTodayWorkouts/:id',verifyToken,(req,res)=>{
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

  
  