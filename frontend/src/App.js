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

function App() {
  const token = localStorage.getItem('token');
  console.log("token:", token, typeof token);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={token != null ? <Navigate to="/Home" /> : <SignUp />}
          />
          <Route
            path="/Login"
            element={token != null ? <Navigate to="/Home" /> : <Login />}
          />
          <Route
            path="/Home"
            element={token != null ? <Home /> : <Navigate to="/Login" />}
          />
          <Route
            path="/CreateWorkout"
            element={token != null ? <CreateWorkout /> : <Navigate to="/Login" />}
            // element={<CreateWorkout />}
          />
          <Route
            path="/PastWorkouts"
            element={token != null ? <PastWorkouts /> : <Navigate to="/Login" />}
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
