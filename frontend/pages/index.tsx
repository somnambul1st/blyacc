import Head from "next/head"
import React, { useState, useEffect } from "react"
import Form from "../components/Form"
import Input from "../components/Input"
import {
  faLink,
} from "@fortawesome/free-solid-svg-icons"
import Notiflix from 'notiflix';
import axios from "axios"

const http = axios.create({
    baseURL: "",
})

export default function IndexPage() {
    const [shortUrl, setShortUrl] = useState<string>()
    const [countDay, setCountDay] = useState<number>(0)
    const [countAll, setCountAll] = useState<number>(0)
    const [countAlco, setCountAlco] = useState<number>(11)

  const onSuccess = (shortUrl: string) => {
    setShortUrl(shortUrl)
  }

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl ?? "");
      Notiflix.Notify.success("Ссылка успешно скопирована!")
      setShortUrl("")
    } catch (err) {
        Notiflix.Notify.failure("Произошла ошибка, обратитесь в поддержку!")
        console.error('Failed to copy: ', err);
    }
  }

  useEffect(() => {
     http.get("/api/stats", {}).then(function (res) {
         setCountDay(res.data.shorten_day)
         setCountAll(res.data.shorten_all)
         setCountAlco(11)
     }).catch(function (err) {
         Notiflix.Notify.failure("Произошла ошибка загрузки статистики, обратитесь в поддержку!")
         console.log(err)
     })
  }, [])

  return (
    <>
      <Head>
        <title>BLYA.CC - Пиздатый сервис для сокращения ссылок</title>
      </Head>
        <div className={`main-head min-h-[350px] max-h-[750px] flex-1 flex flex-col justify-center items-center`}>
          <div className={`max-w-4xl w-full mx-auto h-full flex justify-center content-start text-left flex-col px-4`}>
              <a href={"/"}><img src={'/images/blya.cc.png'} width={300} height={40} alt={"Logo"}/></a>
              <h1 className={'mt-3 text-lg lg:text-xl font-semibold'}>Пиздатый сервис для сокращения ссылочек</h1>
          </div>
          <div className="max-w-4xl w-full mx-auto relative mt-8 px-4">
            {shortUrl ? (
              <>
                <Input
                  icon={faLink}
                  placeholder="Ваша ссылка"
                  value={shortUrl}
                  readOnly
                />
                <button
                  className={'copy-btn absolute w-max -bottom-8 right-8 bg-black rounded px-5 py-4 z-10 disabled:opacity-50'}
                  onClick={() => copyContent()}
                >
                  <img src={"/images/file.svg"} width={28} height={32} alt={"file"}/>
                </button>
              </>
            ) : (
              <Form onSuccess={onSuccess} />
            )}
          </div>
        </div>
        <div className={`statistics bg-black text-center lg:text-left`}>
            <div className={`max-w-4xl w-full mx-auto grid lg:grid-cols-3 gap-x-6 p-4`}>
                <div className={`font-medium text-white`}>Всего сокращено ссылок: {countAll}</div>
                <div className={`font-medium text-white`}>Сокращено за 24 часа: {countDay}</div>
                <div className={`font-medium text-white`}>Выпито бутылок виски: {countAlco}</div>
            </div>
        </div>
        <footer className={`bg-[#131313] pb-10 lg:pb-4 h-fit`}>
            <div className={`max-w-4xl w-full mx-auto grid lg:grid-cols-2 gap-y-5 gap-x-10 py-5 lg:py-16 p-4`}>
                <div>
                    <a href={`/`} className={`font-semibold text-xl lg:text-2xl text-white`}>blya.cc/</a>
                    <p className={`mt-2 lg:mt-5 lg:font-medium text-white text-sm lg:text-base`}>
                        Разработано бутылкой виски и славным кодером<br />
                        Сервис для сокращения ссылок<br/>
                        Ебал в рот bit.ly
                    </p>
                </div>
                <div className={`bg-[#1E1F20] border border-[rgba(255,255,255,.15)] rounded-[10px] relative h-28 lg:h-[136px] w-full py-5 px-5 lg:py-7 lg:px-10`}>
                    <h3 className={`font-bold text-white text-lg lg:text-xl`}>Понравился Blya.cc?</h3>
                    <p className={`mt-1 text-xs lg:text-sm text-[rgba(255,255,255,.4)]`}>Подпишись на телегу, и кайфуй!</p>
                    <img src={"/images/footer_cart.png"} className={`absolute -top-14 -right-16 w-[240px] lg:w-[300px] lg:-right-28 object-cover`} width={300} height={300} alt={'Cart'}/>
                    <a href={"https://t.me/danielgrash"} target={"_blank"} className={"absolute left-5 lg:left-9 -bottom-6"}>
                        <img src={"/images/tg.png"} width={127} height={52} alt={"Telegram"}/>
                        <p className={`text-white font-bold text-xl absolute z-[1] top-3.5 left-8`}>Телега</p>
                    </a>
                </div>
            </div>
        </footer>
    </>
  )
}
