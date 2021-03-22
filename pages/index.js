import React from 'react';
import padStart from 'lodash/padStart';
import classnames from 'classnames';

import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Item from '@components/Item';

class Home extends React.Component {
  state = {
    active: false,
    initialOne: false,
    initialTwo: false,
    mouseX: -1,
    mouseY: -1,
    windowWidth: -1,
    windowHeight: -1,
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
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
        gridEls.push(<Item imgSrc={`${directory}${filename}`} />)
      }
    }
    return gridEls;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ initialOne: true })
    }, 100);

    document.addEventListener('mousemove', (e) => {
      this.setState({mouseX: e.pageX, mouseY: e.pageY});
    });

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const { active, initialOne, initialTwo, mouseX, mouseY, windowWidth, windowHeight } = this.state;

    const firstGridClass = classnames('grid', {
      moved: active,
      initial: initialOne
    });
    const secondGridClass = classnames('grid', {
      initial: initialTwo,
    });

    const gridXOffset = mouseX - (windowWidth / 2);
    const gridYOffset = mouseY - (windowHeight / 2);
    const gridTransform = `${gridXOffset / -10}px, ${gridYOffset / -10}px`;

    return (
      <div className="container">
        <Head>
          <title>The Architectural Beast</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Header />

        <main ref={this.mainElRef}>
          <div 
            className={firstGridClass}
            style={{
              transform: `translate(${gridTransform})`
            }}
          >
            {this.createGrid()}
          </div>
          {
            active && <div className={secondGridClass}>{this.createGrid()}</div>
          }
          {/* <div className="breadcrumbs" onClick={this.setActiveState}>
            <span className="arrow">
              {String.fromCharCode(11105)}
            </span>
            <div>Go to previous day</div>
          </div> */}
        </main>

        <Footer />
      </div>
    )
  }
}

export default Home;