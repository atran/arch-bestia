import React from 'react';
import { AnimatePresence } from "framer-motion";
import { parse, format, subDays, addDays, isBefore } from 'date-fns'

import Header from '@components/Header';
import Grid from '@components/Grid';



class Home extends React.Component {
  constructor(props) {
    super(props);

    const FIRST_DATE = '2021-03-29';
    const LAST_DATE = props.lastDateFormatted;
    this.firstDate = parse(FIRST_DATE, 'yyyy-MM-dd', new Date());
    this.lastDate = parse(LAST_DATE, 'yyyy-MM-dd', new Date());
    
    const currDate = this.lastDate;
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
          firstDate={this.firstDate}
          lastDate={this.lastDate}
          currDate={iterations[1]} 
          goToPrevDay={this.goToPrevDay}
          goToNextDay={this.goToNextDay}
        />

        <main className="grids">
          <AnimatePresence>
            {iterations.map((thisIteration) =>
              isBefore(thisIteration, this.firstDate)
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

export async function getStaticProps() {
  const currDateFormatted = format(new Date(), 'yyyy-MM-dd');
  return {
    props: { lastDateFormatted: currDateFormatted }
  }
}

export default Home;