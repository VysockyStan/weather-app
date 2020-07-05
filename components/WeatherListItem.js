import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  detail: {
    flexBasis: '25%',
    flexShrink: 0,
  },
  details: {
    backgroundColor: '#f8f8ff'
  }
}));

const DetailItem = ({ caption, value }) => {
  const classes = useStyles();

  return (
    <div className={classes.detail}>
      <div><Typography variant="caption">{caption}</Typography></div>
      <div><Typography variant="subtitle2">{value}</Typography></div>
    </div>
  )
};

const WeatherListItem = ({ details, expanded, handleExpandChange, getFormattedDate, getFormattedTemperature }) => {
  const {
    id, place_name: placeName, datetime, latitude, longitude,
    temperature_max: tempMax, temperature_min: tempMin,
    precipitation_probability: precipProb, precipitation_mm: precipMm
  } = details;
  const classes = useStyles();

  return (
    <Accordion key={id} expanded={expanded === id} onChange={handleExpandChange(id)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{placeName}</Typography>
        <Typography className={classes.heading}>{getFormattedDate(datetime)}</Typography>
        <Typography className={classes.heading}>{getFormattedTemperature(tempMin, tempMax)}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <DetailItem caption="Latitude" value={latitude} />
        <DetailItem caption="Longitude" value={longitude} />
        <DetailItem caption="Precipitation probability" value={`${precipProb}%`} />
        <DetailItem caption="Precipitation (mm)" value={precipMm} />
      </AccordionDetails>
    </Accordion>
  );
};

WeatherListItem.propTypes = {
  details: PropTypes.object.isRequired,
  expanded: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  handleExpandChange: PropTypes.func.isRequired,
  getFormattedDate: PropTypes.func.isRequired
};

export default WeatherListItem;
