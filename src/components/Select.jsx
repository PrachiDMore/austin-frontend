import React from 'react'

const Select = ({ id, label, onChange, value, options, required }) => {
  return (
    <>
      <div className='flex flex-col Nunito relative'>
        {label && <label className='text-sm cursor-pointer mb-1 font-bold' htmlFor={id}>{label}:</label>}
        <select required={required} onChange={onChange} value={value} className='border focus:shadow-purpleShadow duration-300 outline-none shadow-md px-4 py-3 rounded-md w-full ' id={id} >
          {
            options?.map((option, index) => {
              return <option value={option.value} key={option.value + index}>{option.label}</option>
            })
          }
        </select>
      </div>
    </>
  )
}

export default Select