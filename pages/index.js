import React from 'react';
import { AnimatePresence } from "framer-motion";
import { parse, subDays, isBefore } from 'date-fns'

import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Grid from '@components/Grid';

const CURRENT_DATE = '2021-03-16';

class Home extends React.Component {
  constructor(props) {
    super(props);
    
    const currDate = parse(CURRENT_DATE, 'yyyy-MM-dd', new Date());
    const prevDate = subDays(currDate, 1);
    this.state = {
      caption: '',
      iterations: [prevDate, currDate]
    }
  }

  changeCaption = (caption) => {
    this.setState({
      caption,
    });
  }

  changeDate = () => {
    const { iterations } = this.state;

    const prevDate = subDays(iterations[0], 1);
    const currDate = subDays(iterations[1], 1);
    this.setState({
      iterations: [prevDate, currDate]
    });
  }

  render() {
    const { 
      caption,
      iterations,
    } = this.state;

    return (
      <div className="container">
        <Head>
          <title>The Architectural Beast</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Header 
          currDate={iterations[1]} 
          changeDate={this.changeDate}
        />

        <main className="grids">
          <AnimatePresence>
            {iterations.map((thisIteration) =>
              <Grid
                key={thisIteration.toString()}
                iterationDate={thisIteration}
                isPast={isBefore(thisIteration, iterations[1])} 
                changeCaption={this.changeCaption} 
              />
            )}
          </AnimatePresence>
        </main>

        <Footer caption={caption} />
      </div>
    )
  }
}

export default Home;