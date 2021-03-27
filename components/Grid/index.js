import React from 'react';
import padStart from 'lodash/padStart';
import classnames from 'classnames';

import Item from '@components/Item';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseX: -1,
      mouseY: -1,
      windowWidth: -1,
      windowHeight: -1,
    }
  }

  updateWindowDimensions = () => {
    this.setState({ 
      windowWidth: window.innerWidth, 
      windowHeight: window.innerHeight 
    });
  }

  changeCaption(x, y) {
    const loc = (x * 15) + y;
    console.log(x, y);
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
            mouseEnterHandler={() => this.changeCaption(x, y)}
          />)
      }
    }
    return gridEls;
  }

  componentDidMount() {
    const { isPast } = this.props;
    if (!isPast) {
      document.addEventListener('mousemove', (e) => {
        this.setState({ mouseX: e.pageX, mouseY: e.pageY });
      });

      window.addEventListener('resize', this.updateWindowDimensions);
      this.updateWindowDimensions();
    }
  }

  render() {
    const {
      windowWidth,
      windowHeight,
      mouseX,
      mouseY
    } = this.state;
    const { isPast } = this.props;

    const gridXOffset = mouseX - (windowWidth / 2);
    const gridYOffset = mouseY - (windowHeight / 2);
    const gridTransform = `${gridXOffset / -10}px, ${gridYOffset / -10}px`;

    const gridClasses = classnames('grid', {
      'previous-grid': isPast
    });
    const gridStyle = isPast ? null
    : {
      transform: `translate(${gridTransform})`
    }
    ;
    
    return (
      <div 
        className={gridClasses}
        style={gridStyle}
      >
        { this.createGrid() }
      </div>
    )
  }
}

export default Grid;