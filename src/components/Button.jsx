import React from 'react'
import Spinner from './Spinner'

const Button = ({ onClick, type = "button", text = "", loading = false, className }) => {
	return (
		<>
			<button disabled={loading} onClick={onClick} className={'hover:bg-lightPurple duration-200 disabled:cursor-not-allowed disabled:bg-darkPurple disabled:bg-opacity-60 bg-darkPurple rounded-md text-sm font-bold text-white w-full py-3 ' + className} type={type}>{loading ? <Spinner /> : text}</button>
		</>
	)
}

export default Button
