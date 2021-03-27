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
      captions: [],
    }
  }

  updateWindowDimensions = () => {
    this.setState({ 
      windowWidth: window.innerWidth, 
      windowHeight: window.innerHeight 
    });
  }

  createGrid() {
    const { changeCaption } = this.props;
    const { captions } = this.state;

    let gridEls = []
    for (let x = 0; x <= 15; x++) {
      for (let y = 0; y <= 15; y++) {
        const directory = 'iterations/2021-03-16/'
        const filename = `out256_${padStart(y, 2, '0')}_${padStart(x, 2, '0')}.png`
        const gridItemIdx = y + 15 * x;
        gridEls.push(          
          <Item 
            imgSrc={`${directory}${filename}`} 
            mouseEnterHandler={() => 
              changeCaption(captions[gridItemIdx])
            }
          />
        )
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

    const directory = 'iterations/2021-03-16/'

    fetch(`${directory}captions.json`)
      .then(response => response.json())
      .then(captions => this.setState({ captions, }))
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
    const gridTransformStyle = 
      isPast 
      ? 'scale(0.6)' 
      : `translate(${gridTransform})`
      ;
    
    return (
      <div 
        className={gridClasses}
        style={{ transform: gridTransformStyle }}
      >
        { this.createGrid() }
      </div>
    )
  }
}

export default Grid;