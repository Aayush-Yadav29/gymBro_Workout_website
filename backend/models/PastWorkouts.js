const mongoose = require('mongoose');
const workoutSchema = require('./Workout');
const pastworkoutSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  workoutData: [
    {
      exercise: {
        type: String,
        required: true,
      },
      sets: {
        type: String,
        required: true,
      },
      reps: {
        type: String,
        required: true,
      },
      weight:{
        type: Number,
        required: true,
      }
    },
  ],
  user_id : {
    type : String,
    required: true,
  }
}, {
  timestamps: true, // This will automatically add createdAt and updatedAt fields
});

const Workout = mongoose.model('PastWorkout', pastworkoutSchema);

module.exports = Workout;
