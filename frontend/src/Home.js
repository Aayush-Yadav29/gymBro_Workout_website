import React from 'react'
import AllWorkouts from './AllWorkouts';
import './style/Home.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { ReactComponent as CreateSvg } from './img/create.svg';
import { ReactComponent as PastSvg } from './img/pastworkout.svg';
import { ReactComponent as DashSvg } from './img/dashboard.svg';
export const Home = () => {
  const paperStyle = { backgroundColor: "black", height: 100, width: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }

  const PaperBox = {
    width: '150', height: '150',
    display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s, backgroundColor 0.3s', // Transition for smooth hover effect
    '&:hover': {
      transform: 'scale(1.05)', // Slightly scale up the Paper on hover
      // backgroundColor: 'darkred', // Change background color on hover
      cursor: 'pointer',
    }
  }
  return (

    <div className="divApp">
      <div className="parallax">
        <div className="overlay">
          <h1>Welcome to your one stop solution for workout plans</h1>
          <p></p>
        </div>
      </div>

      <Box>
        <Grid container spacing={1} justifyContent="space-around" paddingTop={15} paddingBottom={15}>
          <Grid item marginTop={3} marginBottom={3}>
            <Paper sx={paperStyle}>
              <Link to="/CreateWorkout" style={{ textDecoration: 'none' }}>
                <Box sx={PaperBox}>
                  <CreateSvg width={100} height={100} />
                  <Typography align='center' color="white" variant="body1" sx={{ marginTop: 1 }}>
                    Create Workout
                  </Typography>
                </Box>
              </Link>
            </Paper>
          </Grid>
          <Grid item marginTop={3} marginBottom={3}>
            <Paper sx={paperStyle}>
              <Link to="/PastWorkouts" style={{ textDecoration: 'none' }}>
                <Box sx={PaperBox}>
                  <PastSvg margin={2} width={100} height={100} />
                  <Typography align='center' color="white" variant="body1" sx={{ marginTop: 1 }}>
                    Past Workouts
                  </Typography>
                </Box>
              </Link>
            </Paper>
          </Grid>
          <Grid item marginTop={3} marginBottom={3}>
            <Paper sx={paperStyle}>
              <Link to="/Dashboard" style={{ textDecoration: 'none' }}>
                <Box sx={PaperBox}>
                  <DashSvg width={100} height={100} />
                  <Typography align='center' color="white" variant="body1" sx={{ marginTop: 1 }}>
                    Dashboard
                  </Typography>
                </Box>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <AllWorkouts />
    </div>

  )
}
