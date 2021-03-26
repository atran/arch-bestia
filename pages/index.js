import React from 'react';
import padStart from 'lodash/padStart';
import classnames from 'classnames';

import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Grid from '@components/Grid';
import Item from '@components/Item';

import CAPTIONS from './captions'

class Home extends React.Component {
  state = {
    active: true,
    initialOne: false,
    initialTwo: true,
    mouseX: -1,
    mouseY: -1,
    windowWidth: -1,
    windowHeight: -1,
    caption: CAPTIONS[0]
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

  changeCaption(index) {
    this.setState({
      caption: CAPTIONS[index]
    })
  }

  createGrid() {
    let gridEls = []
    for (let x = 0; x <= 15; x++) {
      for (let y = 0; y <= 15; y++) {
        const directory = 'iterations/2021-03-16/'
        const filename = `out256_${padStart(y, 2, '0')}_${padStart(x, 2, '0')}.png`
        gridEls.push(
          <Item 
            imgSrc={`${directory}${filename}`} 
            mouseEnterHandler={() => this.changeCaption((x * 15) + y)}
          />
        )
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
    const { active, initialOne, initialTwo, mouseX, mouseY, windowWidth, windowHeight, caption } = this.state;

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
          {/* <div className="grids">
          </div> */}

          <div 
            className={firstGridClass}
          >
            {this.createGrid()}
          </div>
          {
            active 
            && 
            <div 
              className={secondGridClass}
              style={{
                transform: `translate(${gridTransform})`
              }}
            >
              {this.createGrid()}
            </div>
          }
          {/* <div className="breadcrumbs" onClick={this.setActiveState}>
            <span className="arrow">
              {String.fromCharCode(11105)}
            </span>
            <div>Go to previous day</div>
          </div> */}
        </main>

        <Footer caption={caption} />
      </div>
    )
  }
}

export default Home;