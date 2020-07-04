import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  hero: {
    padding: 32,
    width: '60%',
    backgroundColor: '#2196f312'
  },
}));

const Hero = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      {children}
    </div>
  );
};

Hero.propTypes = {
  children: PropTypes.node.isRequired
};

export default Hero;
