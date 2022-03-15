import Navbar from '../components/Navbar/Navbar';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <div className='app'>
        <Navbar />
        <Component {...pageProps} />
      </div>
  )
}

export default MyApp
