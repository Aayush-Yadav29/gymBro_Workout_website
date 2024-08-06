import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardDisplay({ Ex_title, Sets, Reps, CardNumber, TotalCards, prevSlide, nextSlide, currSlide, lengthCards, cardInfo }) {

  // console.log("from cardisplay : ", cardInfo);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [expanded, setExpanded] = React.useState(false);


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: 345,
          boxShadow: 3,    // Optional: adds some shadow for better visibility
        }}
      >

        <CardHeader
          title={Ex_title}
          subheader={CardNumber.toString() + " of " + TotalCards.toString()}
        />
        <CardMedia
          component="img"
          image={cardInfo[0].gifUrl}
          alt="Exercise GIF"
          sx={{
            width: '100%',  // This will make the image responsive
            maxWidth: '200px',  // Adjust this value to your desired maximum width
            height: 'auto',  // This allows the height to adjust based on the aspect ratio
            maxHeight: '300px',  // Adjust this value to your desired maximum height
            objectFit: 'contain',  // This ensures the entire image is visible without cropping
            margin: 'auto',  // This centers the image if it's smaller than its container
          }}
        />
        <CardContent>
          <TableContainer>
            <Table sx={{
              width: '80%',
              '& .MuiTableCell-root': {
                borderBottom: 'none'
              }
            }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Sets</TableCell>
                  <TableCell align="center">Reps</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center"><Typography variant="body1">{Sets}</Typography></TableCell>
                  <TableCell align="center"><Typography variant="body1">{Reps}</Typography></TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>


        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              {cardInfo[0].instructions}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}