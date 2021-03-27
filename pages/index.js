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

  render() {
    const { caption } = this.state;

    return (
      <div className="container">
        <Head>
          <title>The Architectural Beast</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Header />

        <main className="grids" ref={this.mainElRef}>
          <Grid isPast={true} />
          <Grid changeCaption={this.changeCaption} />
        </main>

        {/* <div className="breadcrumbs" onClick={this.setActiveState}>
          <span className="arrow">
            {String.fromCharCode(11105)}
          </span>
          <div>Go to previous day</div>
        </div> */}
        <Footer caption={caption} />
      </div>
    )
  }
}

export default Home;