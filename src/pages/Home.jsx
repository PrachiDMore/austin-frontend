import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {
	return (
		<>
			<Navbar/>
			<Link to='/signin'>Sign in</Link>
		</>
	)
}

export default Home
