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

export default function CardDisplay({ Ex_title, Sets, Reps, CardNumber, TotalCards, prevSlide, nextSlide, currSlide, lengthCards }) {
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [expanded, setExpanded] = React.useState(false);


  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={Ex_title}
          subheader={CardNumber.toString() + " of " + TotalCards.toString()}
        />
        <CardMedia
        // here you can add gif of exercise
        // for now lets keep exercise name

        />
        <CardContent>
          <Typography variant="h6">Sets</Typography>
          <Typography variant="body1">{Sets}</Typography>
          <Typography variant="h6">Reps</Typography>
          <Typography variant="body1">{Reps}</Typography>
          
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
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
              aside for 10 minutes.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}