import React from 'react';
import { AnimatePresence } from "framer-motion";
import { parse, subDays, addDays, isBefore } from 'date-fns'

import Header from '@components/Header';
import Grid from '@components/Grid';

const FIRST_DATE = '2021-03-29';
const LAST_DATE = '2021-04-01';
const firstDate = parse(FIRST_DATE, 'yyyy-MM-dd', new Date());
const lastDate = parse(LAST_DATE, 'yyyy-MM-dd', new Date());

class Home extends React.Component {
  constructor(props) {
    super(props);``
    
    const currDate = lastDate;
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

  goToPrevDay = () => {
    const { iterations } = this.state;

    const prevDate = subDays(iterations[0], 1);
    const currDate = subDays(iterations[1], 1);
    this.setState({
      iterations: [prevDate, currDate]
    });
  }

  goToNextDay = () => {
    const { iterations } = this.state;

    const prevDate = addDays(iterations[0], 1);
    const currDate = addDays(iterations[1], 1);
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
        <Header 
          firstDate={firstDate}
          lastDate={lastDate}
          currDate={iterations[1]} 
          goToPrevDay={this.goToPrevDay}
          goToNextDay={this.goToNextDay}
        />

        <main className="grids">
          <AnimatePresence>
            {iterations.map((thisIteration) =>
              isBefore(thisIteration, firstDate)
              ? <span /> :
              <Grid
                key={thisIteration.toString()}
                iterationDate={thisIteration}
                isPast={isBefore(thisIteration, iterations[1])} 
                changeCaption={this.changeCaption} 
              />
            )}
          </AnimatePresence>
        </main>

        <p className="caption">
          {caption}
        </p>
      </div>
    )
  }
}

export default Home;