import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

import useSWR from 'swr';

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/readfiles', fetcher);

  return (
    <div className="container">
      <Head>
        <title>The Architectural Beast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />

      <main>
        <div className="grid">
          {!data && "Loading..."}
          {data && data.map(imgPath => <figure><img src={imgPath} alt=""/></figure>)}
        </div>
      </main>

      <Footer />
    </div>
  )
}
