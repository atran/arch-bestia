import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"

import range from 'lodash/range';

import Artist from '@components/Artist';

function Gallery({ artists }) {
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
  console.log(artists)
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
          {/* {
            artists.map(({ artist, link, directory}) => (
              <Artist key={directory} name={artist} link={link} dir={directory} />
            ))
          } */}
        </motion.div>
      </main>
    </div>
  )
}

// export async function getStaticProps() {
//   const dev = process.env.NODE_ENV !== 'production';
//   const server = dev ? 'http://localhost:3000' : 'https://archbestia.com';

//   const res = await fetch(`${server}/artists/index.json`)
//   const artists = await res.json()

//   if (!artists) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { artists }, // will be passed to the page component as props
//   }
// }

export default Gallery;