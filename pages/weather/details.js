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

import { getWeatherData } from '../../lib/weather'
import DatePicker from '../../components/DatePicker'

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
  const [filters, setFilters] = useState({ station: '', date: new Date('2014-09-01') });
  const [expanded, setExpanded] = useState(false);

  const itemsPerPage = 15;
  const [page, setPage] = useState(1);
  const [pagesAmount] = useState(
    Math.ceil(weather.length / itemsPerPage)
  );

  const handlePaginate = (event, value) => {
    setPage(value);
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

  const handleClearSearch = (e) => {
    setFilters(prevState => {
      return {
        ...prevState,
        station: ''
      }
    })
  };

  const { station, date } = filters;
  const paginatedData = weather.filter((item, index) => {
    return index > (page - 1) * itemsPerPage && index < page * itemsPerPage
  });

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

        {paginatedData.map(item => (
          <Accordion key={item.id} expanded={expanded === item.id} onChange={handleExpandChange(item.id)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>{item.place_name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

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
      </Paper>
    </Container>
  )
};


export default Details;