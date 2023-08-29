import Head from "next/head"
import React, { PointerEvent, useState } from "react"
import Form from "../components/Form"
import Result from "../components/Result"

export default function IndexPage() {
  const [, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState<string>()

  const resetUrl = (event: PointerEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    setShortUrl("")
    setUrl("")
  }

  const onSuccess = (url: string, shortUrl: string) => {
    setUrl(url)
    setShortUrl(shortUrl)
  }

  return (
    <>
      <Head>
        <title>BLYA.CC - Пиздатый сервис для сокращения ссылок</title>
      </Head>
      <div className={`main-head`}>
          <div className={`max-w-2xl mx-auto h-full flex justify-center flex-col`}>
              <a href={"/"} onClick={resetUrl}><img src={'/images/blya.cc.png'} width={300} height={40} alt={"Logo"}/></a>
              <h1 className={'mt-3 text-xl font-semibold'}>Пиздатый сервис для сокращения ссылочек</h1>
          </div>
      </div>
      <div className="max-w-2xl mx-auto relative -top-5">
        {shortUrl ? (
          <Result shortUrl={shortUrl} />
        ) : (
          <Form onSuccess={onSuccess} />
        )}
      </div>
    </>
  )
}
