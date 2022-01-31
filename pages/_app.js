import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { DAppProvider } from '@usedapp/core'

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider>
      <Component {...pageProps} />
    </DAppProvider>
  )
}

export default MyApp
