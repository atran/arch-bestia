import React, { useState } from 'react';

export default function Item({imgSrc, mouseEnterHandler}) {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <figure
      className={isActive ? 'selected': null} 
      onClick={toggleClass} 
      onMouseEnter={mouseEnterHandler}
    >
      <img src={imgSrc} alt="" />
    </figure>
  )
}