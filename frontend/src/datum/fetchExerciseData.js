import { useState, useEffect } from 'react';
const { split } = require('../data');
const baseUrl = process.env.REACT_APP_BASE_URL;


function transformData(arr) {
  arr.reverse();    // reverse the arr to get data in increasing order of date
  // Initialize the final array
  const finalArr = [];

  // Iterate over each object in the input array
  arr.forEach(item => {
    const bench = item.workoutData.find(exercise => exercise.exercise === "Barbell Bench Press");
    const squat = item.workoutData.find(exercise => exercise.exercise === "Barbell Full Squat");
    const deadl = item.workoutData.find(exercise => exercise.exercise === "Barbell Deadlift");
    if (bench) {
      finalArr.push({ label: item.date, benchpress: bench.weight });
    }
    if (squat) {
      finalArr.push({ label: item.date, squat: squat.weight });
    }
    if (deadl) {
      finalArr.push({ label: item.date, deadlift: deadl.weight });
    }
  });

  return finalArr;
}

function workoutDistribution(arr) {
  // Initialize the distribution array
  const distr = new Array(split.length).fill(0);
  // Iterate over each object in the input array
  arr.forEach(item => {
    item.workoutData.forEach(exer => {
      for (let i = 0; i < split.length; i++) {
        const isPresent = split[i].some(elem => elem.label === exer.exercise);
        if (isPresent) {
          distr[i] = distr[i] + 1;
        }
      }
    });

  });
  // back,chest,bicepsandForearm,triceps,shoulders,legs
  const finalArr = [
    { "label": "Back", "value": distr[0] },
    { "label": "Chest", "value": distr[1] },
    { "label": "Biceps and Forearm", "value": distr[2] },
    { "label": "Triceps", "value": distr[3] },
    { "label": "Shoulders", "value": distr[4] },
    { "label": "Legs", "value": distr[5] },
  ];
  return finalArr;
}
function exercisePR(arr) {
  const finalArr = [
    { "label": "Barbell Bench Press", "value": 0 },
    { "label": "Dumbbell Alternate Biceps Curl", "value": 0 },
    { "label": "Dumbbell Incline Shoulder Raise", "value": 0 },
    { "label": "Alternate Lateral Pulldown", "value": 0 },
    { "label": "Barbell Full Squat", "value": 0 },
    { "label": "Barbell Deadlift", "value": 0 },
  ];
  // Iterate over each object in the input array
  arr.forEach(item => {
    item.workoutData.forEach(exer => {
      // Iterate through the array
      for (let i = 0; i < finalArr.length; i++) {
        if (finalArr[i].label === exer.exercise) {
          finalArr[i].value = Math.max(finalArr[i].value,exer.weight);
        }
      }
    });

  });
  return finalArr
}
export const useFetchWorkouts = () => {
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [distrArr, setdistrArr] = useState([]);
  const [arrPR, setarrPR] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/getPastWorkout`, {
          headers: {
            'Authorization': token
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setAllWorkouts(transformData(result));
        setdistrArr(workoutDistribution(result));
        setarrPR(exercisePR(result));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { allWorkouts, loading, distrArr,arrPR };
};
