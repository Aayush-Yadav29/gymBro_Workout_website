const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  exerciseData: [
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
    },
  ],
  user_id : {
    type : String,
    required: true,
  }
}, {
  timestamps: true, // This will automatically add createdAt and updatedAt fields
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
