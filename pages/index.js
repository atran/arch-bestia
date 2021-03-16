import padStart from 'lodash/padStart';
import classnames from 'classnames';

import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React from 'react';


class Home extends React.Component {
  state = {
    active: false,
    initialOne: false,
    initialTwo: false,
  }

  setActiveState = () => {
    this.setState({
      active: true,
    })
    setTimeout(() => {
      this.setState({ initialTwo: true })
    }, 10);
  }
  
  createGrid() {
    let gridEls = []
    for (let x = 0; x <= 15; x++) {
      for (let y = 0; y <= 15; y++) {
        const directory = 'iterations/2021-03-15/'
        const filename = `out_${padStart(x, 2, '0')}_${padStart(y, 2, '0')}.png`
        gridEls.push(
          <figure>
            <img src={`${directory}${filename}`} alt="" onClick={this.addGrid}/>
          </figure>
        )
      }
    }
    return gridEls;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ initialOne: true })
    }, 100);
  }

  render() {
    const { active, initialOne, initialTwo } = this.state;
    const firstGridClass = classnames('grid', {
      moved: active,
      initial: initialOne
    });
    const secondGridClass = classnames('grid', {
      initial: initialTwo,
    });

    return (
      <div className="container">
        <Head>
          <title>The Architectural Beast</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Header />

        <main ref={this.mainElRef}>
          <div className={firstGridClass} onClick={this.setActiveState}>
            {this.createGrid()}
          </div>
          {
            active && <div className={secondGridClass}>{this.createGrid()}</div>
          }

        </main>

        <Footer />
      </div>
    )
  }
}

export default Home;