import React from 'react'
import { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'


const Input = ({step=1, id, label = false, placeholder, onChange, value, type, password = false, required = false, readOnly = false, className, accept }) => {
  const [showPassword, setShowPassword] = useState(!password);
  return (
    <>
      <div className={'flex flex-col Nunito relative ' + className}>
        {label ? <label className='text-sm cursor-pointer mb-1 font-bold' htmlFor={id}>{label}:</label> : <p></p>}
        {password ? <input required={required} onChange={onChange} value={value} readOnly={readOnly} className='border focus:shadow-purpleShadow duration-300 outline-none shadow-md px-4 py-3 rounded-md w-full ' id={id} type={showPassword ? "text" : "password"} placeholder={placeholder} /> : type === "time" ? <input accept={accept} onChange={onChange} readOnly={readOnly} value={value} className='read-only:cursor-pointer border focus:shadow-purpleShadow duration-300 outline-none shadow-md px-4 py-3 rounded-md w-full ' id={id} type={"time"} placeholder={placeholder} required={required} /> : <input step={step} onChange={onChange} readOnly={readOnly} value={value} className='read-only:cursor-pointer border focus:shadow-purpleShadow duration-300 outline-none shadow-md px-4 py-3 rounded-md w-full ' id={id} type={type} placeholder={placeholder} required={required} />}
        <div onClick={() => { setShowPassword(!showPassword) }} className={password ? 'stroke-2 text-lg cursor-pointer absolute right-5 bottom-[14px] text-purpleBlue block' : 'hidden'}>
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      </div>
    </>
  )
}

export default Input