import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './Home';
import Navbar from './Navbar';
import CreateWorkout from './CreateWorkout';
import { TodayWorkout } from './TodayWorkout';
import CarouselWorkout from './CarouselWorkout';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/Login';
import { PastWorkouts } from './PastWorkouts';
import LandingPage from './LandingPage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector((state)=>{return state.user.token});
  console.log("token:", token, typeof token);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={token   ? <Navigate to="/Home" /> : <SignUp />}
          />
          <Route
            path="/Login"
            element={token ? <Navigate to="/Home" /> : <Login />}
          />
          <Route
            path="/Home"
            element={token ? <Home /> : <Navigate to="/Login" />}
          />
          <Route
            path="/CreateWorkout"
            element={token ? <CreateWorkout /> : <Navigate to="/Login" />}
            // element={<CreateWorkout />}
          />
          <Route
            path="/PastWorkouts"
            element={token ? <PastWorkouts /> : <Navigate to="/Login" />}
            // element={<PastWorkouts />}
          />        
          <Route
            path="/LandingPage"
            element={<LandingPage />}
          />
          <Route
            path="/Home/:id"
            element={<TodayWorkout />}
          />
          <Route
            path="/Home/TodayWorkout/:id"
            element={<CarouselWorkout />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
