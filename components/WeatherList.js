import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DateFnsAdapter  from '@date-io/date-fns';

import ListItem from './WeatherListItem';

const dateFns = new DateFnsAdapter();

const WeatherList = ({ list }) => {
  const [expanded, setExpanded] = useState(false);
  const DATE_FORMAT = 'MM/dd/yyyy';

  const handleExpandChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getFormattedDate = (date) => {
    return dateFns.format(new Date(date), DATE_FORMAT)
  };

  const getFormattedTemperature = (min, max) => {
    return `${Math.ceil(max)}\u02DA / ${Math.ceil(min)}\u02DA`;
  };

  return (
    list.map((item) => (
      <ListItem
        key={item.id}
        expanded={expanded}
        handleExpandChange={handleExpandChange}
        getFormattedDate={getFormattedDate}
        getFormattedTemperature={getFormattedTemperature}
        details={item}
      />))
  );
};

WeatherList.propTypes = {
  list: PropTypes.array.isRequired
};

export default WeatherList;
