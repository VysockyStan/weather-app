import Button from '@material-ui/core/Button';
import Head from 'next/head'
import React from 'react';
import Link from 'next/link'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  hero: {
    padding: 32,
    width: '60%',
    backgroundColor: '#2196f312'
  },
  heroContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100vh'
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={classes.heroContainer}>
          <Paper className={classes.hero}>
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
          </Paper>
        </div>
      </main>
    </Container>
  )
}
