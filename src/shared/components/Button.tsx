import React, { type ReactElement, useMemo } from 'react'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

type ButtonColor = 'primary' | 'secondary' | 'success'

interface ButtonProps {
  children?: React.ReactNode
  color: ButtonColor
  onClick?: () => void
  disabled?: boolean
  type?: ButtonType
  isLoading?: boolean
  className?: string
}

const getButtonColor = (buttonColor: ButtonColor): string => {
  const colors = {
    primary: 'bg-blue-dark',
    secondary: 'bg-black',
    success: 'bg-success'
  }

  return colors[buttonColor]
}

const getButtonLoadingColor = (buttonColor: ButtonColor): string => {
  const colors = {
    primary: 'bg-blue-dark',
    secondary: 'bg-black-light',
    success: 'bg-success-dark'
  }

  return colors[buttonColor]
}

const Button = ({ children, color, onClick, disabled = false, type = 'button', isLoading = false, className = '' }: ButtonProps): ReactElement => {
  const bgColor = useMemo(() => {
    if (isLoading || disabled) {
      return getButtonLoadingColor(color)
    }
    return getButtonColor(color)
  }, [color, isLoading, disabled])

  const textColor = useMemo(() => {
    return bgColor.slice(3, bgColor.length)
  }, [bgColor])

  const loadingStyle = `text-${textColor} after:absolute after:w-5 after:h-5 after:top-0 after:right-0 after:left-0 after:bottom-0 after:m-auto after:border-4 after:border-t-white after:opacity-100 after:rounded-[50%] after:animate-spin`

  return (
    <button
      className={`${className} ${bgColor} uppercase px-4 py-[6px] rounded-lg relative ${isLoading ? loadingStyle : 'text-white'}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
