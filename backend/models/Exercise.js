const mongoose = require('mongoose');
const ExerciseSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image: {
        type : String,
    }

},{timestamps : true});
const Exercise = mongoose.model("Exercise",ExerciseSchema);
module.exports = Exercise;