import { AnimateSharedLayout } from 'framer-motion';
import Head from 'next/head';

import Footer from '@components/Footer';

import '@styles/reset.css';
import '@styles/globals.css'

function Application({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>The Architectural Beast</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AnimateSharedLayout>
      <Component {...pageProps} />
      <Footer />
    </AnimateSharedLayout>
    </>
  )
}

export default Application
