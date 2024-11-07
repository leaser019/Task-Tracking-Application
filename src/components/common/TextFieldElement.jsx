import React from 'react'
import clsx from 'clsx'

const TextField = React.forwardRef(
  (
    { name, label, placeholder = '', className, register, error, type },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className="text-slate-800">
            {label}
          </label>
        )}
        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...register}
            className={clsx(
              'bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base  focus:ring-2 ring-blue-300',
              className
            )}
          />
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5">{error}</span>
        )}
      </div>
    )
  }
)

export default TextField
