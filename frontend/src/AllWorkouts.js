import * as React from 'react';
import NewAccordion from './NewAccordian';
const baseUrl = require('./env');
function NestedList() {
  const [allWorkouts, setallWorkouts] = React.useState([]);
  const token = localStorage.getItem('token');
  console.log(token);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/getWorkouts`,{
          headers: {  
            'Authorization': token
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setallWorkouts(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    Your Workouts
    {allWorkouts.map((obj) =>(
      <NewAccordion title={obj.title} exerciseList={obj.exerciseData} id = {obj._id}/>
    ))}
    </>
  );
}

export default NestedList;
