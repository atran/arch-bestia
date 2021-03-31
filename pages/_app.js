import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';

import Footer from '@components/Footer';

import '@styles/reset.css';
import '@styles/globals.css'

function Application({ Component, pageProps, router }) {
  return (
    <>
    <Head>
      <title>The Architectural Beast</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AnimatePresence>
      <motion.div 
        key={router.route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        exitBeforeEnter
      >
        <Component {...pageProps} />
      </motion.div>
      <Footer />
    </AnimatePresence>
    </>
  )
}

export default Application
