import React, { useState } from 'react';
import styles from './style.module.css';

export default function Artist({ name, link, dir, clickHandler }) {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div 
      className={styles.artistbox}
      onClick={() => clickHandler('https://player.vimeo.com/video/43341047')} 
    >
      <img src={`/artists/${dir}/artist.jpg`} />
      {/* {
        isActive &&
        <video 
          src="/artists/00_Amorphis_LA/artist.mp4" 
          autoPlay loop controls
        />
      } */}
      <h3><a href={link} target="_blank">{name}</a></h3>
    </div>
  )
}