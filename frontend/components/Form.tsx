import { faLink } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "./Button"
import Input from "./Input"
import ReCAPTCHA from "react-google-recaptcha";
import Notiflix from 'notiflix';

const http = axios.create({
  baseURL: "",
})

type FormProps = {
  onSuccess: (shortUrl: string) => void
}

type IFormInput = {
  url: string
}

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY!

const URL_RE = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$',
    'i'
);

const isValidUrl = (inString: string): boolean => {
  if (inString.length < 3)
    return false

  if (inString.toLowerCase().includes("blya.cc"))
    return false

  try {
    const url = new URL(inString);
    return !!url.hostname && url.protocol.indexOf('http') === 0;
  } catch (e) {
    return false;
  }

  if (typeof inString !== 'string') return false;

  return URL_RE.test(inString);
};

const Form = ({ onSuccess }: FormProps) => {
  const recaptchaRef = React.useRef<ReCAPTCHA>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "all" })

  const url = watch("url", "")
  //const urlWithSchema = url.includes("://") ? url : `https://${url}`

  const shortenUrl: SubmitHandler<IFormInput> = async () => {
    setLoading(true)

    const token = await recaptchaRef?.current?.executeAsync()

    if (!isValidUrl(url)) {
      setLoading(false)
      Notiflix.Notify.failure('Введите правильную ссылку');
      setError("url", {
        type: "error",
        message: "Введите правильную ссылку",
      })
      return false
    }

    try {
      const { data } = await http.post("/api/shorten", {
        url: url,
        expiry: 0,
        token: token,
      })
      onSuccess(data.short_url)
      setLoading(false)
    } catch (error) {
      console.log(error)
      Notiflix.Notify.failure('Произошла ошибка, обратитесь в тех. поддержку!');
      setLoading(false)
    }
  }

  return (
      <form onSubmit={handleSubmit(shortenUrl)} autoComplete="off">
        <div className={`relative`}>
          <Input
              icon={faLink}
              placeholder="Вставь свою большую жирную и неприятную ссылку"
              error={errors.url?.message}
              {...register("url")}
          />

          <Button
              label="Go Short"
              loading={loading}
              className={`submit-btn flex items-center justify-center absolute w-max right-8 bg-black z-10 disabled:opacity-50 -bottom-8`}
          />
        </div>

        <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={recaptchaKey}
        />
      </form>
  )
}

export default Form
