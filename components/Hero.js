import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
  hero: {
    padding: 32,
  },
}));

const Hero = ({ children }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.hero}>
      {children}
    </Paper>
  );
};

Hero.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Hero;
