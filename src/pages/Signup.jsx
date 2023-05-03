import React, { useState } from 'react'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Alert from '../components/Alert'

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("");
  return (
    <>
      <Alert message={message} setMessage={setMessage} />
      <section className='h-[100vh] w-[100vw] flex Nunito'>
        <div className='w-[50%] bg-purpleBlue'></div>
        <div className='w-[50%] p-20 bg-lightGray flex flex-col justify-center'>
          <h1 className='text-3xl font-bold text-center mb-6'>Hello! Welcome</h1>
          <div className='mb-7 w-full pt-4 flex flex-col gap-y-3'>
            <div className='grid-cols-2 grid gap-6'>
              <Input id={'fname'} label={'First Name'} type={'text'} placeholder={'Enter your first name.'} />
              <Input id={'lname'} label={'Last Name'} type={'text'} placeholder={'Enter your last name.'} />
            </div>
            <Input id={'email'} label={'Email'} type={'email'} placeholder={'Enter your email address.'} />
            <Input id={'username'} label={'Username'} type={'text'} placeholder={'Enter your username.'} />
            <Input password={true} id={'password'} label={'Password'} type={'password'} placeholder={'Enter your password.'} />
          </div>
          <Button text='Create Account' loading={loading} />
          <div className='flex gap-2 py-4 text-sm font-semibold justify-center'>
            <p>Already have an account?</p>
            <Link to='/signin' className='text-purpleBlue'>Login</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup