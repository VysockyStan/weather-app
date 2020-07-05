import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as BaseDatePicker  } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DatePicker = ({ handleDateChange, selectedDate }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BaseDatePicker
        label="Filter by date"
        clearable
        value={selectedDate}
        placeholder="Select date"
        onChange={date => handleDateChange(date)}
        maxDate={new Date('2014-08-13')}
        format="MM/dd/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.object
};

DatePicker.defaultProps = {
  selectedDate: null
};

export default DatePicker;
