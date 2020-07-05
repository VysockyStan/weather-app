import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DatePicker = ({ handleDateChange, selectedDate }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        clearable
        value={selectedDate}
        placeholder="Select date"
        onChange={date => handleDateChange(date)}
        maxDate={new Date('2014-09-01')}
        format="MM/dd/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
};

DatePicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.func.isRequired
};

export default DatePicker;
