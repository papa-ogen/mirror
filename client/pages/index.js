import Head from 'next/head'
import Weather from '../components/Weather';
import Commute from '../components/Commute';

function IndexPage() {
  return (
    <main className='main'>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="/static/index.css" rel="stylesheet" />
      </Head>

      <div className='main-item'>
        <Weather />
      </div>
      <div className='main-item'>
      </div>
      <div className='main-item'>
        <Commute />
      </div>
    </main>
  )
}

export default IndexPage