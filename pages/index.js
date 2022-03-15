import Head from 'next/head'
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Used to get actually hieght for mobile browsers.
    // Mobile bowsers have that bottom nav bar that messes up '100vh'
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    return () => {
      window.removeEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    }
  })

  return (
    <div className='container'>
      <Head>
        <title>Joshua Brigati - Take Home</title>
        <meta name='description' content='Joshua Brigati - Senior Frontend Engineer take home.' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='main'>
        <h1 className='title'>
          Coming Soon!
        </h1>
      </main>
    </div>
  )
}
