import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import DateFnsAdapter from '@date-io/date-fns';

import { getWeatherData } from '../../lib/weather';
import Header from '../../components/WeatherListHeader';
import WeatherList from '../../components/WeatherList';

const dateFns = new DateFnsAdapter();

const useStyles = makeStyles((theme) => ({
  weatherInfoWrapper: {
    margin: '32px 0',
    padding: theme.spacing(3),
  },
  pagination: {
    marginTop: theme.spacing(2),
  },
}));

export async function getStaticProps() {
  const weather = getWeatherData();

  return {
    props: {
      weather,
    },
  };
}

const Details = ({ weather }) => {
  const itemsPerPage = 15;
  const classes = useStyles();
  const [filters, setFilters] = useState({ station: '', date: null });
  const [page, setPage] = useState(1);
  const [pagesAmount] = useState(
    Math.ceil(weather.length / itemsPerPage),
  );

  const handlePaginate = (event, value) => {
    setPage(value);
  };

  const filterWeather = ({ place_name: placeName, datetime }) => {
    const { station, date } = filters;

    if (station) {
      if (!placeName.toLowerCase().includes(station.toLowerCase())) return false;
    }

    if (date) {
      if (!dateFns.isEqual(date.setHours(0, 0, 0, 0), new Date(datetime))) return false;
    }

    return true;
  };

  const isFilterSet = () => {
    const { station, date } = filters;

    return !!station || !!date;
  };

  const getFilteredWeather = () => weather.filter(filterWeather);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateSelect = (value) => {
    setFilters((prevState) => ({
      ...prevState,
      date: value,
    }));
  };

  const handleClearSearch = () => {
    setFilters((prevState) => ({
      ...prevState,
      station: '',
    }));
  };

  const paginate = (item, index) => (
    index > (page - 1) * itemsPerPage && index < page * itemsPerPage
  );

  const getDataToDisplay = () => {
    if (isFilterSet()) return getFilteredWeather();
    return weather.filter((paginate));
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.weatherInfoWrapper}>
        <Header
          handleClearSearch={handleClearSearch}
          handleDateSelect={handleDateSelect}
          handleSelectChange={handleSelectChange}
          filters={filters}
        />

        <WeatherList list={getDataToDisplay()} />

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
          )}
      </Paper>
    </Container>
  );
};

Details.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  weather: PropTypes.array.isRequired,
};

export default Details;
