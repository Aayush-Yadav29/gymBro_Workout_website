import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export const PastWorkouts = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  function formatDate(dateString) {
    // Parse the ISO date string into a Date object
    const date = new Date(dateString);

    // Define an array of month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Extract the day, month, and year
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()]; // getUTCMonth returns 0-based index
    const year = date.getUTCFullYear();

    // Format the date as "day month year"
    return `${day} ${month} ${year}`;
  }
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [allWorkouts, setallWorkouts] = React.useState([]);
  const token = localStorage.getItem('token');
  console.log(token);
  React.useEffect(() => {
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
        setallWorkouts(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Box component="section" sx={{ p: 2, marginTop: 3, marginRight: 3, marginLeft: 3 }}>
        PastWorkouts
        <Box component="section" sx={{ p: 2, marginRight: 2, marginLeft: 2 }}>
          {allWorkouts.map((obj) => (
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>
                  <Box component="span" mb={0} mr={7}>
                    {formatDate(obj.createdAt)}
                  </Box>
                  {obj.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                <Table sx={{width: '80%'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Exercises</TableCell>
                            <TableCell align="center">Sets</TableCell>
                            <TableCell align="center">Reps</TableCell>
                            <TableCell align="center">Weight</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {obj.workoutData.map((row) => (
                            <TableRow
                                key={row.name} // Make sure to use a unique key
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.exercise}</TableCell>
                                <TableCell align="center">{row.sets}</TableCell>
                                <TableCell align="center">{row.reps}</TableCell>
                                <TableCell align="center">{row.weight}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </div>
  )
}
