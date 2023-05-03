import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <section className='flex items-center h-24 w-screen shadow-md shadow-purpleShadow Nunito'>
            <div className='w-[20%] flex justify-center items-center'>
                <img className='w-56 h-auto' src="/assets/logo.jpg" alt="" />
            </div>
            <ul className='w-[60%] flex justify-around items-center '>
                <Link className='hover:text-darkPurple font-semibold' to='/'>Home</Link>
                <Link className='hover:text-darkPurple font-semibold' to='/admission'>Admission</Link>
            </ul>
            <div className='w-[20%] flex justify-center items-center'>
                <Link className='bg-darkPurple rounded-md text-sm font-bold text-white w-auto px-5 py-3 hover:bg-lightPurple duration-300'>Sign up</Link>
            </div>
        </section>
    </>
  )
}

export default Navbar