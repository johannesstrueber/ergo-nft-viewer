import NextHead from '../components/particles/NextHead'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextHead />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
