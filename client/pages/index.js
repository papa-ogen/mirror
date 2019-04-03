import Head from 'next/head'
import Weather from '../components/Weather';
import Commute from '../components/Commute';
import Clock from '../components/Clock';

function IndexPage() {
  return (
    <main className='main'>
      <Head>
        <title>Magic Mirror</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://fonts.googleapis.com/css?family=Anton" rel="stylesheet" />
        <link href="/static/index.css" rel="stylesheet" />
      </Head>

      <div className='main-item'>
        <Weather />
      </div>
      <div className='main-item'>
        <Clock />
      </div>
      <div className='main-item'>
        <Commute />
      </div>
    </main>
  )
}

export default IndexPage