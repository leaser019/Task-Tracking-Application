import React from 'react'
import clsx from 'clsx'

const ButtonElement = ({
  onClick = () => {},
  className,
  label,
  type,
  icon,
}) => {
  return (
    <button
      type={type || 'button'}
      className={clsx('bx-2 py-2 outline-none rounded', className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  )
}

export default ButtonElement
