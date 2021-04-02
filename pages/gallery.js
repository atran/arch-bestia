import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { m, motion } from "framer-motion"

import Artist from '@components/Artist';

const modalStyle = {
  content: {
    width: '70vw',
    height: 'calc(39.375vw + 60px)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 0,
    padding: 0,
    background: 'none',
  }
};
Modal.setAppElement('#__next');
let modal_vid_url;

function Gallery({ artists }) {
  let embed;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(video_url) {
    setIsOpen(true);
    modal_vid_url = video_url;
  }

  function afterOpenModal() {
    embed.src = modal_vid_url;
  }

  function closeModal(){
    setIsOpen(false);
  }

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
	useEffect(mouseMove);

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
            artists.map(({ artist, link, directory, vimeo_url}) => (
              <Artist 
                key={directory} 
                name={artist} 
                link={link} 
                vimeo={vimeo_url}
                dir={directory} 
                clickHandler={openModal}
              />
            ))
          }
        </motion.div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Artist Video"
          style={modalStyle}
        >
          <button 
            onClick={closeModal}
          >
            Close
          </button>
          <div style={{
            padding: '56.25% 0 0 0',
          }}>
            <iframe 
              ref={_embed => (embed = _embed)}
              src="https://player.vimeo.com/video/531918953" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </Modal>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? 'http://localhost:3000' : 'https://archbestia.com';

  const res = await fetch(`${server}/artists/index.json`)
  const artists = await res.json()

  if (!artists) {
    return {
      notFound: true,
    }
  }

  return {
    props: { artists }, // will be passed to the page component as props
  }
}

export default Gallery;