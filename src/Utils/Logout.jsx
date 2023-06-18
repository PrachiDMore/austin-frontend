import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { UseAuthContext } from '../context/Authentication'

const Logout = ({ className }) => {
	const { logout } = UseAuthContext()
	return (
		<>
			<Button onClick={logout} className={className} text='Logout' />
		</>
	)
}

export default Logout
