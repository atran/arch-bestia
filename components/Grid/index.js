import React from 'react';
import padStart from 'lodash/padStart';
import classnames from 'classnames';
import { motion } from "framer-motion"
import { format } from 'date-fns'

import Item from '@components/Item';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.dateFormatted = format(props.iterationDate, 'yyyy-MM-dd');

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

  updateMousePosition = (e) => {
    this.setState({ 
      mouseX: e.pageX, 
      mouseY: e.pageY 
    });
  }

  createGrid() {
    const { changeCaption, iterationDate } = this.props;
    const { captions } = this.state;
    
    let gridEls = []
    for (let x = 0; x <= 11; x++) {
      for (let y = 0; y <= 11; y++) {
        const directory = `iterations/${this.dateFormatted}/`
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
      document.addEventListener('mousemove', this.updateMousePosition);
      window.addEventListener('resize', this.updateWindowDimensions);
      this.updateWindowDimensions();
    }

    const directory = `iterations/${this.dateFormatted}/`;

    fetch(`${directory}captions.json`)
      .then(response => response.json())
      .then(captions => this.setState({ captions, }))
  }

  componentDidUpdate(prevProps) {
    const { isPast } = this.props;
    if (isPast) {
      document.removeEventListener('mousemove', this.updateMousePosition);
      window.removeEventListener('resize', this.updateWindowDimensions);
    } else {
      document.addEventListener('mousemove', this.updateMousePosition);
      window.addEventListener('resize', this.updateWindowDimensions);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.updateMousePosition);
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const {
      windowWidth,
      windowHeight,
      mouseX,
      mouseY
    } = this.state;
    const { isPast, key } = this.props;

    const gridXOffset = mouseX - (windowWidth / 2);
    const gridYOffset = mouseY - (windowHeight / 2);
    const gridTransformX = `${gridXOffset / -5}px`;
    const gridTransformY = `${gridYOffset / -10}px`;

    const gridClasses = classnames('grid', {
      'previous-grid': isPast
    });
    
    const gridScaleStyle = 
      isPast
      ? 0.6 
      : 1
      ;
    
    return (
      <motion.div 
        className="outer-grid"
        key={key}
        initial={{ scale: gridScaleStyle, opacity: 0 }}
        animate={{ scale: gridScaleStyle, opacity: 1 }}
        exit={{ scale: gridScaleStyle + 0.2, opacity: 0 }}
      >
        <motion.div 
          className={gridClasses}
          animate={{ 
            x: gridTransformX,
            y: gridTransformY,
          }}
        >
          { this.createGrid() }
        </motion.div>
      </motion.div>
    )
  }
}

export default Grid;