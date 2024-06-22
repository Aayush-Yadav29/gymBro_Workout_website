import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from './Home';
import Navbar from './Navbar';
import CreateWorkout from './CreateWorkout';
import { TodayWorkout } from './TodayWorkout';
import CarouselWorkout from './CarouselWorkout';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/Login';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PastWorkouts } from './PastWorkouts';
import LandingPage from './LandingPage';

function App() {
  
  const token = localStorage.getItem('token');
 console.log("token : ",token, typeof(token));
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" >
            {(() => {
              if (token != null) {
                return <Redirect to="/Home" />;
                // console.log(token);
              } else {
                console.log("reached Signup");
                return <SignUp />;
              }
            })()}
          </Route>
          
          <Route exact path="/Login">
            
            {(() => {
              if (token != null) {
                return <Redirect to="/Home" />;
              } else {
                return <Login />;
              }
            })()} 
            {/* <Login />; */}
          </Route>
          <Route exact path="/Home">
          {(() => {
              if (token != null) {
                return <Home/>;
              } else {
                return <Login />;
              }
            })()} 
          </Route>

          <Route exact path="/CreateWorkout">
            <CreateWorkout />
          </Route>
          <Route exact path="/PastWorkouts">
            <PastWorkouts/>
          </Route>
          <Route exact path="/LandingPage">
            <LandingPage/>
          </Route>
          <Route exact path="/Home/:id">
            <TodayWorkout />
          </Route>
          <Route exact path="/Home/TodayWorkout/:id">
            <CarouselWorkout />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
