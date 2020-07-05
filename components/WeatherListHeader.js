import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import DatePicker from './DatePicker';

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    margin: '0 -24px'
  },
  filters: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
}));

const WeatherListHeader = ({ filters, handleSelectChange, handleClearSearch, handleDateSelect }) => {
  const classes = useStyles();
  const { station, date } = filters;

  return (
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
  );
};

WeatherListHeader.propTypes = {
  filters: PropTypes.object.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
  handleDateSelect: PropTypes.func.isRequired,
};

export default WeatherListHeader;
