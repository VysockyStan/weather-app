import Head from 'next/head';
import React from 'react';
import Container from '@material-ui/core/Container';
import Hero from '../components/Hero';
import HeroContainer from '../components/HeroContainer';
import Welcome from '../components/Welcome';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroContainer>
          <Hero>
            <Welcome />
          </Hero>
        </HeroContainer>
      </main>
    </Container>
  )
}
