import React, { useState } from 'react';
import padStart from 'lodash/padStart';

const createClick = (data) => {
  return fetch('/api/clicks-create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

export default function Item({imgDate, x, y, mouseEnterHandler}) {
  const [isActive, setActive] = useState(false);
  const clickHandler = (imgDate, x, y, filename) => {
    // Toggle Class
    setActive(!isActive);
    // Log It
    createClick({
      createdAt: new Date(),
      iterationDate: imgDate,
      imageFilename: filename,
      x,
      y,
    });
  };

  const directory = `iterations/${imgDate}/`;
  const filename = `out256_${padStart(y, 2, '0')}_${padStart(x, 2, '0')}.jpg`;
  const imgSrc = `${directory}${filename}`;
  return (
    <figure
      className={isActive ? 'selected': null} 
      onClick={() => clickHandler(imgDate, x, y, filename)} 
      onMouseEnter={mouseEnterHandler}
      key={imgSrc}
    >
      <img src={imgSrc} alt="" />
    </figure>
  )
}