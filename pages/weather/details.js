import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Pagination from '@material-ui/lab/Pagination';
import DateFnsAdapter  from '@date-io/date-fns';

import { getWeatherData } from '../../lib/weather'
import DatePicker from '../../components/DatePicker'

const dateFns = new DateFnsAdapter();

const useStyles = makeStyles((theme) => ({
  weatherInfoWrapper: {
    margin: '32px 0',
    padding: theme.spacing(3),
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    margin: '0 -24px'
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  cleanFilterIcon: {
    cursor: 'pointer'
  },
  filters: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  pagination: {
    marginTop: theme.spacing(2),
  }
}));

export async function getStaticProps() {
  const weather = getWeatherData();

  return {
    props: {
      weather
    }
  }
}

const Details = ({ weather }) => {
  const classes = useStyles();
  const [filters, setFilters] = useState({ station: '', date: null });
  const [expanded, setExpanded] = useState(false);

  const itemsPerPage = 15;
  const [page, setPage] = useState(1);
  const [pagesAmount] = useState(
    Math.ceil(weather.length / itemsPerPage)
  );

  const handlePaginate = (event, value) => {
    setPage(value);
  };

  const filterWeather = ({ place_name, datetime }) => {
    const { station, date } = filters;

    if (station && !place_name.toLowerCase().includes(station.toLowerCase())) return false;
    if (date && !dateFns.isEqual(date.setHours(0,0,0,0), new Date(datetime))) return false;

    return true;
  };

  const isFilterSet = () => {
    const { station, date } = filters;

    return !!station || !!date;
  };

  const getFilteredWeather = () => {
    return weather.filter(filterWeather);
  };

  const handleExpandChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFilters(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  };

  const handleDateSelect = (value) => {
    setFilters(prevState => {
      return {
        ...prevState,
        date: value
      }
    })
  };

  const handleClearSearch = () => {
    setFilters(prevState => {
      return {
        ...prevState,
        station: ''
      }
    })
  };

  const paginate = (item, index) => {
    return index > (page - 1) * itemsPerPage && index < page * itemsPerPage
  };

  const getFormattedDate = (date) => {
    return dateFns.format(new Date(date), 'MM/dd/yyyy')
  };

  const getDataToDisplay = () => {
    if (isFilterSet()) return getFilteredWeather();
    return weather.filter((paginate));
  };

  const { station, date } = filters;

  return (
    <Container maxWidth="md">
      <Paper className={classes.weatherInfoWrapper}>

        <div className={classes.header}>
          <Typography variant="h4" gutterBottom>
            Weather in Netherlands
          </Typography>

          <div className={classes.filters}>
            <FormControl>
              <InputLabel htmlFor="station-search">Search by station name</InputLabel>
              <Input
                id="station-search"
                name="station"
                type="text"
                value={station}
                onChange={handleSelectChange}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch}>
                      <HighlightOffIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <DatePicker handleDateChange={handleDateSelect} selectedDate={date} />
          </div>
        </div>

        {getDataToDisplay().map(({
          id, place_name: placeName, datetime, latitude, longitude,
          temperature_max: tempMax, temperature_min: tempMin,
          precipitation_probability: precipProb, precipitation_mm: precipMm
        }) => (
          <Accordion key={id} expanded={expanded === id} onChange={handleExpandChange(id)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{placeName}</Typography>
              <Typography className={classes.heading}>{getFormattedDate(datetime)}</Typography>
              <Typography className={classes.heading}>{tempMax} &#8451; / {tempMin} &#8451;</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div><Typography variant="caption">Latitude</Typography></div>
                <div><Typography variant="subtitle2">{latitude}</Typography></div>
              </div>

              <div>
                <div><Typography variant="caption">Longitude</Typography></div>
                <div><Typography variant="subtitle2">{longitude}</Typography></div>
              </div>
              <div>
                <div><Typography variant="caption">Precipitation probability</Typography></div>
                <div><Typography variant="subtitle2">{precipProb}</Typography></div>
              </div>
              <div>
                <div><Typography variant="caption">Precipitation mm</Typography></div>
                <div><Typography variant="subtitle2">{precipMm}</Typography></div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}

        {!isFilterSet()
          && (
            <div className={classes.pagination}>
              <Pagination
                count={pagesAmount}
                page={page}
                onChange={handlePaginate}
                defaultPage={1}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </div>
          )
        }
      </Paper>
    </Container>
  )
};


export default Details;