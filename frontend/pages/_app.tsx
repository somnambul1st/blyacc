import type { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import '../components/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  )
}
