import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import React from "react"

type InputProps = {
  icon?: IconProp
  error?: string
} & React.ComponentProps<"input">

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className, error, ...props }, ref) => {
    return (
      <div className={`input ` + className}>
        <div className="relative">
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className="h-5 w-5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          )}

          <input
            {...props}
            className={classNames(
              "bg-[#1A1B1C] text-md lg:text-lg font-medium outline-0 border-4 w-full py-4 pr-2.5 pl-9 focus:border-gray-400 transition duration-300",
              error ? "border-red-700 text-red-500" : "border-[rgba(255,255,255,0.20)] color-[#616161]"
            )}
            ref={ref}
          />
        </div>
        {/*error ? (
          <div className="text-sm text-red-700 mt-1 mx-2.5">{error}</div>
        ) : (
          ""
        )*/}
      </div>
    )
  }
)

export default Input
