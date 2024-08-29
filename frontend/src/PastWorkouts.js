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
  // console.log(token);
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
        // console.log(result);
        setallWorkouts(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    // <div>
            <Box
                component="section"
                sx={{
                  p: 4,
                  paddingTop:10,
                    bgcolor: '#000000', // Dark background for the main section
                    color: '#ffffff', // Light text color
                    height: 'auto',         // Allows height to expand based on content
                    minHeight: '100vh',     // Ensures minimum height is the full viewport height
                    minWidth: '100vw',   
                }}
            >
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Your Workout History
                </Typography>
                <Box
                    component="section"
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection:'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                    }}
                >
                    {allWorkouts.map((obj) => (
                        <Accordion
                            key={obj.createdAt} // Using createdAt as a key (ensure it is unique)
                            sx={{
                                bgcolor: '#232b33', // Dark background for the accordion
                                color: '#ffffff', // Light text color for the accordion
                                borderRadius: 2,
                                marginBottom:1,
                                width:'90%',

                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />} // Light color for the expand icon
                                aria-controls="panel1-content"
                                id={`panel1-header-${obj.createdAt}`} // Unique id for each accordion
                            >
                                <Typography>
                                    <Box component="span" mb={0} mr={7}>
                                        {formatDate(obj.createdAt)}
                                    </Box>
                                    {obj.title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    bgcolor: '#232b33', // Slightly lighter dark background for details
                                    color: '#ffffff', // Light text color for the details
                                }}
                            >
                                <TableContainer component={Paper} sx={{ maxwidth: '100px', bgcolor: '#3b4754' }}>
                                    <Table sx={{ bgcolor: '#3b4754'}} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" sx={{ color: '#ffffff' }}>Exercises</TableCell>
                                                <TableCell align="center" sx={{ color: '#ffffff' }}>Sets</TableCell>
                                                <TableCell align="center" sx={{ color: '#ffffff' }}>Reps</TableCell>
                                                <TableCell align="center" sx={{ color: '#ffffff' }}>Weight</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {obj.workoutData.map((row) => (
                                                <TableRow
                                                    key={row.name} // Ensure unique key for each row
                                                    sx={{
                                                        '&:last-child td, &:last-child th': { border: 0 },
                                                        bgcolor: '#3b4754', // Darker background for table rows
                                                        color: '#ffffff', // Light text color for table cells
                                                    }}
                                                >
                                                    <TableCell align="center"  sx = {{color: '#ffffff'}}>{row.exercise}</TableCell>
                                                    <TableCell align="center" sx = {{color: '#ffffff'}}>{row.sets}</TableCell>
                                                    <TableCell align="center" sx = {{color: '#ffffff'}}>{row.reps}</TableCell>
                                                    <TableCell align="center" sx = {{color: '#ffffff'}}>{row.weight}</TableCell>
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
        // </div>
  )
}
