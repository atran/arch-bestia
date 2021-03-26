import React from 'react';
import padStart from 'lodash/padStart';
import classnames from 'classnames';

import Item from '@components/Item';

export default class Grid extends React.Component {
  createGrid() {
    let gridEls = []
    for (let x = 0; x <= 15; x++) {
      for (let y = 0; y <= 15; y++) {
        const directory = 'iterations/2021-03-16/'
        const filename = `out256_${padStart(y, 2, '0')}_${padStart(x, 2, '0')}.png`
        gridEls.push(<Item imgSrc={`${directory}${filename}`} />)
      }
    }
    return gridEls;
  }

  render() {
    const gridClasses = classnames('grid');
    
    return (
      <div className={gridClasses}>
      { this.createGrid() }
      </div>
    )
  }
}