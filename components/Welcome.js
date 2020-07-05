import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Link from 'next/link';
import React from 'react';

const Welcome = () => (
  <>
    <Typography variant="h3" gutterBottom>
      Welcome to Weather App!
    </Typography>
    <Typography variant="h5" gutterBottom>
      Find weather information for cities in the Netherlands
    </Typography>
    <Link href="/weather/details">
      <Button
        variant="contained"
        size="large"
        color="primary"
        endIcon={<ArrowForwardIcon />}
      >
        View weather
      </Button>
    </Link>
  </>
);

export default Welcome;
