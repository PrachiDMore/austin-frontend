import React from 'react'
import Spinner from './Spinner'

const Button = ({onClick, type="button", text="", loading=false}) => {
	return (
		<>
			<button disabled={loading} onClick={onClick} className='disabled:bg-darkPurple disabled:bg-opacity-60 bg-darkPurple rounded-md text-sm font-bold text-white w-full py-3' type={type}>{loading ? <Spinner/> : text}</button>
		</>
	)
}

export default Button
