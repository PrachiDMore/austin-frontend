import React from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import Input from '../components/Input'
import { Link } from 'react-router-dom'

const Signin = () => {
    return (
        <>
            <section className='h-[100vh] w-[100vw] flex Nunito'>
                <div className='w-[50%] bg-purpleBlue'></div>
                <div className='w-[50%] h-full p-20 bg-lightGray flex flex-col justify-center '>
                    <h1 className='text-2xl font-semibold text-center'>Hello! Welcome Back</h1>
                    <div className='w-full pt-4 flex flex-col gap-y-3'>
                        <Input id={'username'} label={'Username'} icon={<FaUserAlt className='text-purpleBlue' />} type={'text'} placeholder={'Enter your username.'} />
                        <Input id={'password'} label={'Password'} icon={<RiLockPasswordFill className='text-purpleBlue' />} type={'password'} placeholder={'Enter your password.'} />
                    </div>
                    <div className='flex justify-between py-4'>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" />
                            <p className='text-sm'>Remember me</p>
                        </div>
                        <Link className='text-sm text-purpleBlue'>Reset password!</Link>
                    </div>
                    <button className='bg-purpleBlue rounded-md text-sm font-semibold text-white w-full py-2' type='button'>Login</button>
                    <div className='flex gap-2 py-4 text-sm justify-center'>
                        <p>Don't have an account?</p>
                        <Link to='/signup' className='text-purpleBlue'>Create Account</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signin