import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import React from "react"
import styles from "./Button.module.css"

type ButtonProps = {
  label: string
  icon?: IconProp
  loading?: boolean
} & (
  | React.ComponentProps<"button">
  | (React.ComponentProps<"a"> & { href: string })
)

const Button = ({ icon, label, loading, ...props }: ButtonProps) => {
  const content = loading ? (
    <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" size="lg" />
  ) : (
    <>
      {icon ? <FontAwesomeIcon icon={icon} className="mr-2" /> : ""} {label == "Go Short" ? <img src={"/images/StrokeIcon.svg"} width="41" height="30" alt="Stroke" /> : {label}}
    </>
  )

  return "href" in props ? (
    <a {...props} className={classNames(props.className)}>
      {content}
    </a>
  ) : (
    <button
      {...props}
      className={classNames(
        loading && styles.btnLoading,
        props.className
      )}
      disabled={loading || props.disabled}
    >
      {content}
    </button>
  )
}

export default Button
