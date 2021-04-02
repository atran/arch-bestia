import React, { useState } from 'react';
import styles from './style.module.css';

export default function Artist({ name, link, dir, vimeo, clickHandler }) {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div 
      className={styles.artistbox}
    >
      <img
        src={`/artists/${dir}/artist.jpg`} 
        onClick={() => clickHandler(vimeo)} 
      />
      <h3>by <a href={link} target="_blank">{name}</a></h3>
    </div>
  )
}