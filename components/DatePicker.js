import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as BaseDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

const DatePicker = ({ handleDateChange, selectedDate }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <BaseDatePicker
      label="Filter by date"
      clearable
      value={selectedDate}
      placeholder="Select date"
      onChange={(date) => handleDateChange(date)}
      maxDate={new Date('2014-08-13')}
      format="MM/dd/yyyy"
    />
  </MuiPickersUtilsProvider>
);

DatePicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedDate: PropTypes.object,
};

DatePicker.defaultProps = {
  selectedDate: null,
};

export default DatePicker;
