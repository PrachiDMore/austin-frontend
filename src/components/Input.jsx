import React from 'react'


const Input = ({id, label, placeholder, onChange, value, type}) => {
  return (
    <>
      <div className='flex flex-col Nunito'>
        <label className='text-sm cursor-pointer mb-1 font-semibold' htmlFor={id}>{label}:</label>
          <input onChange={onChange} value={value} className='focus:shadow-purpleShadow duration-300 outline-none shadow-md px-3 py-3 rounded-md w-full text-sm ' id={id} type={type} placeholder={placeholder} />
        </div>
    </>
  )
}

export default Input