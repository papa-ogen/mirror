import Head from 'next/head'
import Weather from '../components/Weather';

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Weather />
    </div>
  )
}

export default IndexPage