import clsx from 'clsx'
import React from 'react'
import { tailwindToHex } from '../../../utils'
import { Link } from 'react-router-dom'

const TaskTitle = ({
  label,
  className = '',
  bgColor = 'bg-white',
  number = 0,
  link = '',
}) => {
  const color = tailwindToHex[className] || '#000000'

  return (
    <Link
      className={clsx(
        'w-full h-10 md:h-12 px-2 md:px-4 rounded-2xl flex items-center justify-between py-1',
        bgColor,
        'hover:bg-gray-100 transition-colors duration-300',
        'shadow-md',
        'font-nunito'
      )}
      to={link}
    >
      <div className="flex gap-2 items-center">
        <div className={clsx('w-4 h-4 rounded-full', className)} />
        <p className="text-sm md:text-base text-gray-800 font-semibold hover:text-gray-600 transition-colors duration-300">
          {label}
        </p>
      </div>

      <button className="hidden md:block rounded-full hover:bg-gray-200 p-2 transition-colors duration-300">
        <span className="text-sm md:text-base text-gray-800" style={{ color }}>
          {number}
        </span>
      </button>
    </Link>
  )
}

export default TaskTitle
