import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <nav className='flex items-center h-24 w-screen shadow-md shadow-purpleShadow Nunito'>
            <div className='w-[20%] flex justify-center items-center'>
                <img className='w-56 h-auto' src="/assets/logo.jpg" alt="" />
            </div>
            <ul className='px-10 w-[60%] flex justify-start gap-x-20 items-center '>
                <Link className='navLink hover:text-darkPurple font-semibold' to='/'>Home</Link>
                <Link className='navLink hover:text-darkPurple font-semibold' to='/admission'>Admission</Link>
                <Link className='navLink hover:text-darkPurple font-semibold' to='/admin/subjects'>Subject</Link>
                <Link className='navLink hover:text-darkPurple font-semibold' to='/admin/chapters'>Chapter</Link>
            </ul>
            <div className='w-[20%] flex justify-center items-center'>
                <Link className='bg-darkPurple rounded-md text-sm font-bold text-white w-auto px-5 py-3 hover:bg-lightPurple duration-300'>Sign up</Link>
            </div>
        </nav>
    </>
  )
}

export default Navbar