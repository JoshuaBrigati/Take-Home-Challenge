import Navbar from '../components/Navbar/Navbar';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div style={{height: '100vh'}}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
