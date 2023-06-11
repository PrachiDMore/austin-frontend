import React, { useState } from 'react'
import { FaCheck } from "react-icons/fa"

const Checkbox = ({ id, label = false, onChange, checked, required = false, readOnly = false }) => {
	const [checkedItem, setCheckedItem] = useState(checked);
	return (
		<>
			<div className='relative'>
				<input required={required} readOnly={readOnly} id={id} checked={checkedItem} onChange={(e) => { if (!e.target.readOnly) { setCheckedItem(e.target.checked); onChange(e); } }} type="checkbox" className='hidden' />
				<label htmlFor={id} className='flex gap-2 w-max'>
					{label && <p className='cursor-pointer'>{label}:</p>}
					<span className='cursor-pointer border-2 border-darkPurple flex items-center justify-center h-[20px] w-[20px] rounded bg-white'>
						<FaCheck className={checkedItem ? 'opacity-100 duration-150 text-darkPurple text-xs' : 'opacity-0 duration-150 text-darkPurple text-xs'} />
					</span>
				</label>
			</div>
		</>
	)
}

export default Checkbox
