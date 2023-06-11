import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const Logout = ({className}) => {
	const navigate = useNavigate()
	const logout = () => {
		sessionStorage.removeItem(btoa("token"));
		navigate("/signin");
	}
  return (
	<>
		<Button onClick={logout} className={className} text='Logout'/>
	</>
  )
}

export default Logout
