import React from 'react'
import { useEffect } from 'react'

const Alert = ({ message, setMessage }) => {
	useEffect(() => {
		if (message?.length > 0) {
			setTimeout(() => {
				setMessage("")
			}, 3000)
		}
	}, [message]);
	return (
		<>
			<div className={message?.length > 0 ? 'shadow-xl rounded-xl min-w-[30vw] fixed top-10 border-2 duration-300 left-1/2 -translate-x-1/2 bg-white py-3 px-10 flex justify-center z-[5000]' : 'z-[5000] shadow-xl rounded-xl min-w-[30vw] fixed -top-10 border-2 duration-300 left-1/2 -translate-x-1/2 bg-white py-3 px-10 flex justify-center'}>{message}</div>
		</>
	)
}

export default Alert
