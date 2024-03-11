import type { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import '../components/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`min-h-screen flex flex-col font-default`}>
      <Component {...pageProps} />
    </main>
  )
}
