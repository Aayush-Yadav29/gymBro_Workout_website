import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Area } from "react-chartjs-2";
import CircularProgress from '@mui/material/CircularProgress';
import './style/Dash.css';


import { useFetchWorkouts } from './datum/fetchExerciseData';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function Dash() {
  const { allWorkouts, loading, distrArr, arrPR } = useFetchWorkouts();
  function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day + 1} ${month} ${year}`;
  }
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);
  if (loading) {
    return <CircularProgress variant="determinate" value={progress} />
  }

  return (

    <div className="graphhdiv">
      {/* {console.log("allWorkouts", allWorkouts)} */}
      {/* {console.log("arrPR", arrPR)} */}
      
      <div className="dataCard customerCard">
        <Bar
          data={{
            labels: arrPR.map((data) => data.label),
            datasets: [
              {
                label: "", // Provide an empty string for the label
                data: arrPR.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "#179c43",
                  "#07e2ed",
                  "#e88905",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Personal Records",
              },
              legend: {
                display: false, // Hide legend if no label is provided
              },
            },
          }}
        />
      </div>

      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: distrArr.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: distrArr.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "#179c43",
                  "#07e2ed",
                  "#e88905",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "#179c43",
                  "#07e2ed",
                  "#e88905",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Muscle-wise Distribution",
              },
            },
          }}
        />
      </div>
      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: allWorkouts.map((data) => formatDate(data.label)),
            datasets: [
              {
                label: "Bench Press",
                data: allWorkouts.map((data) => data.benchpress),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
                spanGaps: true,
              },
              {
                label: "Squat",
                data: allWorkouts.map((data) => data.squat),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
                spanGaps: true,
              },
              {
                label: "Deadlift",
                data: allWorkouts.map((data) => data.deadlift),
                backgroundColor: "#34eb40",
                borderColor: "#34eb40",
                spanGaps: true,
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Growth",
              },
            },
          }}
        />
      </div>
    </div>
  );
};