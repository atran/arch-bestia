import React from 'react';
import padStart from 'lodash/padStart';
import classnames from 'classnames';

import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Grid from '@components/Grid';

// import CAPTIONS from './../constants/captions'

class Home extends React.Component {
  state = {
    caption: '',
  }

  changeCaption = (caption) => {
    this.setState({
      caption,
    });
  }

  loadPreviousDay() {

  }

  render() {
    const { caption } = this.state;
    const prevDate = '2021-03-15';
    const currDate = '2021-03-16';

    return (
      <div className="container">
        <Head>
          <title>The Architectural Beast</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Header />

        <main className="grids">
          <Grid 
            key={prevDate}
            isPast={prevDate !== currDate} 
            changeCaption={this.changeCaption} 
          />
          <Grid 
            key={currDate}
            isPast={currDate !== currDate} 
            changeCaption={this.changeCaption} 
          />
        </main>

        <div className="breadcrumbs">
          <span className="arrow">
            {String.fromCharCode(11105)}
          </span>
          <div>Go to previous day</div>
        </div>

        <Footer caption={caption} />
      </div>
    )
  }
}

export default Home;