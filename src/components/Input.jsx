import React from 'react'
import { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'


const Input = ({ id, label, placeholder, onChange, value, type, password = false, required = false }) => {
  const [showPassword, setShowPassword] = useState(!password);
  return (
    <>
      <div className='flex flex-col Nunito relative'>
        <label className='text-sm cursor-pointer mb-1 font-bold' htmlFor={id}>{label}:</label>
        {password ? <input required={required} onChange={onChange} value={value} className='border focus:shadow-purpleShadow duration-300 outline-none shadow-md px-4 py-3 rounded-md w-full ' id={id} type={showPassword ? "text" : "password"} placeholder={placeholder} /> : <input onChange={onChange} value={value} className='border focus:shadow-purpleShadow duration-300 outline-none shadow-md px-4 py-3 rounded-md w-full ' id={id} type={type} placeholder={placeholder} required={required} />}
        <div onClick={() => { setShowPassword(!showPassword) }} className={password ? 'stroke-2 text-lg cursor-pointer absolute right-5 bottom-[14px] text-purpleBlue block' : 'hidden'}>
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      </div>
    </>
  )
}

export default Input