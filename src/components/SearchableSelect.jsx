import React from 'react'
import { UseThemeContext } from "../context/Theme"
import Select from 'react-select'

const SearchableSelect = ({ label = false, placeholder, onChange, options=[], value, required = false, id, isMulti, className }) => {
	const { selectTheme } = UseThemeContext()
	return (
		<>
			<div className={'flex flex-col Nunito relative ' + className}>
				{label ? <label className='text-sm cursor-pointer mb-1 font-bold' htmlFor={id}>{label}:</label> : <p></p>}
				<Select styles={selectTheme} isMulti={isMulti} required={required} options={options} onChange={onChange} value={value} placeholder={placeholder} />
			</div>
		</>
	)
}

export default SearchableSelect