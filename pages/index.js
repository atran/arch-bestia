import React from 'react';
import { AnimatePresence } from "framer-motion";
import { parse, format, subDays, addDays, isBefore } from 'date-fns'

import Header from '@components/Header';
import Grid from '@components/Grid';

const FIRST_DATE = '2021-03-29';
const LAST_DATE = '2021-03-30';

class Home extends React.Component {
  constructor(props) {
    super(props);
    
    const currDate = parse(LAST_DATE, 'yyyy-MM-dd', new Date());
    const prevDate = subDays(currDate, 1);
    this.state = {
      caption: '',
      iterations: [currDate, prevDate]
    }
  }

  changeCaption = (caption) => {
    this.setState({
      caption,
    });
  }

  goToPrevDay = () => {
    const { iterations } = this.state;

    const currDate = subDays(iterations[0], 1);
    const prevDate = subDays(iterations[1], 1);
    const nextIterations = [currDate, prevDate];

    // const currDateFormatted = format(prevDate, 'yyyy-MM-dd');
    // if (currDateFormatted === FIRST_DATE) {
    //   nextIterations.shift();
    // }
    
    this.setState({
      iterations: nextIterations,
    });
  }

  goToNextDay = () => {
    const { iterations } = this.state;

    const currDate = addDays(iterations[0], 1);
    const prevDate = addDays(iterations[1], 1);
    const nextIterations = [currDate, prevDate];
    
    this.setState({
      iterations: nextIterations,
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
          firstDateFormatted={FIRST_DATE}
          lastDateFormatted={LAST_DATE}
          currDate={iterations[0]} 
          goToPrevDay={this.goToPrevDay}
          goToNextDay={this.goToNextDay}
        />

        <main className="grids">
          <AnimatePresence>
            {iterations.map((thisIteration) =>
              <Grid
                key={thisIteration.toString()}
                iterationDate={thisIteration}
                isPast={isBefore(thisIteration, iterations[0])} 
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