import React from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'

const ViewAdmissions = () => {
  return (
    <div>
      <Navbar />
      <section className='w-screen min-h-screen p-10 px-20 Nunito'>
        <div className='w-full '>
          <Input type={'text'} placeholder={'Search'} />
          <GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
        </div>
        <ul className='flex justify-around border font-semibold text-darkPurple text-lg border-darkPurple py-2 rounded-md mt-4'>
          <li>Name</li>
          <li>Grade</li>
          <li>Email</li>
          <li>Phone Number</li>
          <li>Gender</li>
        </ul>
        <div className='flex flex-col justify-around border border-darkPurple py-2 rounded-md mt-4 '>
          <ul className='flex justify-around py-2 '>
            <li>Asdfgh</li>
            <li>10th</li>
            <li>abcd</li>
            <li>12345</li>
            <li>Female</li>
          </ul>

        </div>
      </section>
    </div>
  )
}

export default ViewAdmissions
