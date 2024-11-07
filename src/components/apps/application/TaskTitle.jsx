import clsx from 'clsx'
import React from 'react'
import { tailwindToHex } from '../../../utils'
import { LocationAdd } from 'iconsax-react'

const TaskTitle = ({ label, className = '', bgColor = 'bg-gray-100' }) => {
  return (
    <div
      className={clsx(
        'w-full h-10 md:h-12 px-2 md:px-4 rounded-2xl flex items-center justify-between py-1',
        bgColor
      )}
    >
      <div className="flex gap-2 items-center">
        <div className={clsx('w-4 h-4 rounded-full ', className)} />
        <p className="text-sm md:text-base text-gray-600">{label}</p>
      </div>

      <button className="hidden md:block rounded-full">
        <LocationAdd size="24" color={tailwindToHex[className]} />
      </button>
    </div>
  )
}

export default TaskTitle
