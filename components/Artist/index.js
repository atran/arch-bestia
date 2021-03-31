import React, { useState } from 'react';
import styles from './style.module.css';

export default function Artist() {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div 
      className={styles.artistbox}
      onClick={toggleClass} 
    >
      <h2><a href="#">Amorphis LA</a></h2>
      <img src="/artists/00_Amorphis_LA/Ramiro.jpg" />
      {
        isActive &&
        <video 
          src="/artists/00_Amorphis_LA/Ramiro_Granados.mp4" 
          autoPlay loop controls
        />
      }
    </div>
  )
}