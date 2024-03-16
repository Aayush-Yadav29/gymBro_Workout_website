import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import Navbar from './Navbar';
import CreateWorkout from './CreateWorkout';
import { TodayWorkout } from './TodayWorkout';
import CarouselWorkout from './CarouselWorkout';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <SignUp/>
          </Route>
          <Route exact path="/Login">
            <Login/>
          </Route>
          <Route exact path="/Home">
            <Home />
          </Route>
          
          <Route exact path="/CreateWorkout">
            <CreateWorkout />
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
