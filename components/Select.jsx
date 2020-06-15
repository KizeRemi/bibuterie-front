import React from 'react';

const Select = ({ register, children, label, ...props }) => {
  return (
    <div className="w-64">
      <label className="uppercase text-sm text-gray-600">{label}</label>
      <div className="relative">
        <select
          ref={register()}
          className="block appearance-none w-full bg-gray-200 border text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  )
}

export default Select;