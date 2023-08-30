import { faLink } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "./Button"
import Input from "./Input"
import ReCAPTCHA from "react-google-recaptcha";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
})

type FormProps = {
  onSuccess: (url: string, shortUrl: string) => void
}

type IFormInput = {
  url: string
  alias: string
}

const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY!

const isValidUrl = (string: string) => {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

const Form = ({ onSuccess }: FormProps) => {
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    //setError,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "all" })

  const url = watch("url", "")
  const urlWithSchema = url.includes("://") ? url : `https://${url}`

  const shortenUrl: SubmitHandler<IFormInput> = async ({ alias, url }) => {
    setLoading(true)

    const token: any = await recaptchaRef?.current?.executeAsync()

    try {
      await window.grecaptcha.execute(recaptchaKey, {
        action: "submit",
      })
    } catch (error) {
      console.log(error)
    }

    try {
      const { data } = await http.post("/api", {
        url: urlWithSchema,
        alias,
        token,
      })
      onSuccess(url, data.short_url)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(shortenUrl)} autoComplete="off">
      <div className={`relative`}>
        <Input
          icon={faLink}
          placeholder="Вставь свою большую жирную и неприятную ссылку"
          {...register("url")}
          className="mb-4"
        />

        <Input
            placeholder="Alias (optional)"
            {...register("alias", {
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "Use only letters and numbers",
              },
            })}
            error={errors.alias?.message}
            className="mb-4"
            hidden
        />

        <Button
          label="Go Short"
          disabled={!isValidUrl(urlWithSchema)}
          loading={loading}
          className={'submit-btn absolute w-max -bottom-8 right-8 bg-black rounded px-5 py-4 z-10 disabled:opacity-50'}
        />
      </div>

      <ReCAPTCHA
        ref={recaptchaRef as React.RefObject<ReCAPTCHA>}
        size="invisible"
        sitekey={recaptchaKey}
      />
    </form>
  )
}

export default Form
