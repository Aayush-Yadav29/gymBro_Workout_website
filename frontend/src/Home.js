import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import './style/Home.css';


export const Home = () => {
  // State to track which accordion is open
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [isloading, setisloading] = useState(true);

  const toggleAccordion = (index) => {
    // Toggle the accordion: if it's open, close it; if it's closed, open it
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;
  // console.log("baseurl : ",baseUrl);
  const [allWorkouts, setallWorkouts] = React.useState([]);
  const token = localStorage.getItem('token');
  const handleDelete = (id) => {
    console.log(id);
    fetch(`${baseUrl}/api/deleteWorkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ id }),
      // console.log(body);
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  }
  // console.log(typeof token);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/getWorkouts`, {
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
      finally {
        // console.log("marking true");
        setisloading(false);
      }
    };

    fetchData();
  }, []);
  return (

    <div className="flex flex-col min-h-[100dvh] bg-black text-white">
      <header className=" bg-[url('./img/gym_bgm.jpg')] bg-cover bg-center bg-no-repeat  py-8 h-screen">
        <div className="container flex mt-[-50px] h-screen m-auto px-4 md:px-6">
          <div className="m-auto max-w-3xl text-center space-y-4">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl ">Unlock Your Fitness Potential</h1>
            <p className="text-xl font-bold text-white/90 md:text-xl grandstander">
              "The real workout starts when you want to stop." - Ronnie Coleman
            </p>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-20 lg:py-24">
          <div className=" container text-center grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-muted p-6 hover:bg-muted/90 transition-colors">
              <Link to={'/CreateWorkout'} className='flex flex-col items-center gap-1'>
                <DumbbellIcon className="text-center h-12 w-12" />
                <h3 className="text-xl font-bold">Create Workout</h3>
                <p className="text-muted-foreground text-sm">Design your custom workout routine.</p>
              </Link>
            </div>



            <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-muted p-6 hover:bg-muted/90 transition-colors">
              <Link to={'/PastWorkouts'} className='flex flex-col items-center gap-1'>
                <CalendarIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Past Workouts</h3>
                <p className="text-muted-foreground text-sm">Review your previous workout history.</p>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-muted p-6 hover:bg-muted/90 transition-colors">
              <Link to={'/Dashboard'} className='flex flex-col items-center gap-1'>
                <BarChartIcon className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Dashboard</h3>
                <p className="text-muted-foreground text-sm">Track your fitness progress and goals.</p>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20 lg:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Workouts</h2>
              <div className="grid gap-4  ">
                {isloading ? (
                  <div className="flex justify-center items-center py-20">
                    {console.log("loader : ", isloading)}
                    <span class="loader"></span>
                  </div>
                ) : (
                  allWorkouts.length === 0 ? (
                    <div className="w-full text-center text-xl p-2 mt-10">No workouts created  :(</div>
                  ) : (
                    allWorkouts.map((obj, index) => (
                      // <Accordion
                      //           // key={obj.createdAt} // Using createdAt as a key (ensure it is unique)
                      //           sx={{
                      //               bgcolor: '#232b33', // Dark background for the accordion
                      //               color: '#ffffff', // Light text color for the accordion
                      //               borderRadius: 2,
                      //               marginBottom: 1,
                      //               width: '90%',

                      //           }}
                      //       >
                      //           <AccordionSummary
                      //               expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />} // Light color for the expand icon
                      //               aria-controls="panel1-content"
                      //               // id={`panel1-header-${obj.createdAt}`} // Unique id for each accordion
                      //           >
                      //               <Typography>
                      //                   {/* <Box component="span" mb={0} mr={7}>
                      //                       {formatDate(obj.createdAt)}
                      //                   </Box> */}
                      //                   {obj.title}
                      //               </Typography>
                      //           </AccordionSummary>
                      //           <AccordionDetails
                      //               sx={{
                      //                   bgcolor: '#232b33', // Slightly lighter dark background for details
                      //                   color: '#ffffff', // Light text color for the details
                      //               }}
                      //           >
                      //           </AccordionDetails>
                            // </Accordion>
                      <div key={obj.id} className="w-full mx-auto bg-gray-800 rounded-lg mb-4">
                        {/* Accordion Header */}
                        <div className="flex items-center justify-between rounded-lg bg-background p-4 sm:p-6">

                          <div className="flex items-center gap-4">
                            <DumbbellIcon className="h-10 w-10 text-primary" />
                            <div>
                              <h3 className="text-lg font-bold">{obj.title}</h3>
                              <p className="text-muted-foreground text-sm"></p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="bg-transparent border-none p-1" onClick={() => toggleAccordion(index)}>
                              <DropdownIcon className="h-5 w-5" />
                            </button>
                            <Link to={`/Home/${obj._id}`}>
                              <button className="bg-transparent border-none p-1">
                                <PlayIcon className="h-5 w-5" />
                              </button>
                            </Link>
                            <button className="bg-transparent border-none p-1">
                              <Trash2Icon className="h-5 w-5" onClick={() => handleDelete(obj._id)} />
                            </button>
                          </div>
                        </div>

                        {/* Accordion Content */}
                        {openAccordionIndex === index && (
                          <div className="p-4 sm:p-6 bg-background border-t border-gray-200">
                            <p className="text-sm text-muted-foreground">
                              {obj.exerciseData.map((obj2) => (
                                <div key={obj2._id}>{obj2.exercise}</div>
                              ))}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  ))}

              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6 w-full shrink-0">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
          <p className="text-xs text-muted-foreground">&copy; 2024 Gym Workout. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <a href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Terms of Service
            </a>
            <a href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Privacy
            </a>
            <a href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}


function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function DumbbellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  )
}


function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}
function DropdownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}


function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}

