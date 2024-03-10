import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import Navbar from './Navbar';
import CreateWorkout from './CreateWorkout';
import { TodayWorkout } from './TodayWorkout';
import CarouselWorkout from './CarouselWorkout';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path = "/">
            <Home/>
          </Route>
          <Route exact path = "/Home">
            <Home/>
          </Route>
          <Route exact path = "/CreateWorkout">
            <CreateWorkout/>
          </Route>
          <Route exact path="/Home/:id">
            <TodayWorkout/>
          </Route>
          <Route exact path="/Home/TodayWorkout/:id">
            <CarouselWorkout/>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
