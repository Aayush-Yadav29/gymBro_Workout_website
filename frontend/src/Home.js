import React from 'react'
import AllWorkouts from './AllWorkouts';

export const Home = () => {
  const token = localStorage.getItem('token');
 console.log("token from Home: ",token, typeof(token));
  return (
    <div>
    <AllWorkouts/>
    </div>
  )
}
