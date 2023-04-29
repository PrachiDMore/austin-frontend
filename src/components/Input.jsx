import React from 'react'


const Input = ({id, label, placeholder, onChange, value, type, icon}) => {
  return (
    <>
      <div className='flex flex-col Nunito'>
        <label className='text-sm cursor-pointer' htmlFor={id}>{label}:</label>
        <div className='flex shadow-md bg-white items-center gap-2 px-3 py-3 rounded-md'>
          {icon && icon}
          <input onChange={onChange} value={value} className='outline-none w-full text-sm pl-1' id={id} type={type} placeholder={placeholder} />
        </div>
      </div>
    </>
  )
}

export default Input