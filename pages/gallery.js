import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"

import range from 'lodash/range';

import Artist from '@components/Artist';

function Gallery() {
  let mouseMove = () => {
    const updateTransform = (e) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      const gridXOffset = mouseX - (windowWidth / 2);
      const gridYOffset = mouseY - (windowHeight / 2);
      const gridTransformX = `${gridXOffset / -50}px`;
      const gridTransformY = `${gridYOffset / -50}px`;

      setOffsets([gridTransformX, gridTransformY]);
    }


		document.addEventListener('mousemove', updateTransform)
		return () => {
			document.removeEventListener('mousemove', updateTransform)
		}
	};

  const [offsets, setOffsets] = useState(0);
	// useEffect(mouseMove);

  return (
    <div className="container">
      <main className="side-page">
        <motion.div
          className="artists"
          animate={{ 
            x: offsets[0],
            y: offsets[1],
          }}
        >
          {
            range(21).map((idx) => (
              <Artist key={idx}>
                {idx}
              </Artist>
            ))
          }
        </motion.div>
      </main>
    </div>
  )
}

export default Gallery;