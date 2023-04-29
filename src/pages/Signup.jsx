import React from 'react'
import Input from '../components/Input'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <>
      <section className='h-[100vh] w-[100vw] flex Nunito'>
        <div className='w-[50%] bg-purpleBlue'></div>
        <div className='w-[50%] p-20 bg-lightGray flex flex-col justify-center'>
          <h1 className='text-2xl font-semibold text-center'>Hello! Welcome</h1>
          <div className='w-full pt-4 flex flex-col gap-y-3'>
            <div className='grid-cols-2 grid gap-3'>
              <Input id={'fname'} label={'First Name'} type={'text'} placeholder={'Enter your first name.'} />
              <Input id={'lname'} label={'Last Name'} type={'text'} placeholder={'Enter your last name.'} />
            </div>
            <Input id={'email'} label={'Email'} type={'email'} placeholder={'Enter your email address.'} />
            <Input id={'username'} label={'Username'} type={'text'} placeholder={'Enter your username.'} />
            <Input id={'password'} label={'Password'} type={'password'} placeholder={'Enter your password.'} />
          </div>
          <button className='bg-purpleBlue mt-7 rounded-md text-sm font-semibold text-white w-full py-2' type='button'>Create Account</button>
          <div className='flex gap-2 py-4 text-sm justify-center'>
            <p>Already have an account?</p>
            <Link to='/signin' className='text-purpleBlue'>Login</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup