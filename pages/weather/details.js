import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import React, {useState} from 'react';
import { getWeatherData } from '../../lib/weather'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import DatePicker from '../../components/DatePicker'

const useStyles = makeStyles(() => ({
  weatherInfoWrapper: {
    margin: '32px 0',
    padding: 24
  },
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    padding: 24
  },
  cleanFilterIcon: {
    cursor: 'pointer'
  },
  filters: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
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

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFilters(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  };

  const handleDateSelect = (value) => () => {
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

  return (
    <Container maxWidth="md">
      <Paper className={classes.weatherInfoWrapper}>

        <div className={classes.header}>
          <Typography variant="h4" gutterBottom>
            Weather in Netherlands
          </Typography>

          <div>
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

        {weather.map(item => (
          <div key={item.id}>{item.place_name}</div>
        ))}
      </Paper>
    </Container>
  )
};


export default Details