import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
export default function NewAccordion({ title, exerciseList, id }) {
    const token = localStorage.getItem('token');
    const handleDelete = () => {
        console.log(id);
        fetch('/api/deleteWorkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({id}),
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
    return (
        <div>
            <Accordion
                sx={{
                    backgroundColor: '#f0f0f0', // Set the background color
                    margin: '10px', // Set the margin
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {exerciseList.map((obj) => (
                            <ListItem>
                                <ListItemText primary={obj.exercise} />
                            </ListItem>
                        ))}

                    </List>
                    <Button type="submit">
                        <DeleteIcon onClick={handleDelete} />
                    </Button>
                    <Link to={`/Home/${id}`}>
                    <Button type="submit">
                        <SendIcon />
                    </Button>
                    </Link>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
