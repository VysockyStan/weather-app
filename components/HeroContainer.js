import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  heroContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100vh',
  },
}));

const HeroContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.heroContainer}>
      {children}
    </div>
  );
};

HeroContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeroContainer;
