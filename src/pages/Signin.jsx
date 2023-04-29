import React, { useState } from 'react'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
    const initialState = {
        username: '',
        password: ''
    }
    const [formState, setFormState] = useState(initialState)

    const handelChange = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }

    const handelSubmit = () => {
        axios('https://austin-backend.vercel.app/user/signin', {
            method: "POST",
            data: formState
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <section className='h-[100vh] w-[100vw] flex Nunito'>
                <div className='w-[50%] bg-purpleBlue'></div>
                <div className='w-[50%] h-full p-20 bg-lightGray flex flex-col justify-center '>
                    <h1 className='text-2xl font-semibold text-center'>Hello! Welcome Back</h1>
                    <div className='w-full pt-4 flex flex-col gap-y-3'>
                        <Input onChange={handelChange} value={formState.username} id={'username'} label={'Username'} type={'text'} placeholder={'Enter your username.'} />
                        <Input onChange={handelChange} value={formState.password} id={'password'} label={'Password'} type={'password'} placeholder={'Enter your password.'} />
                        <div className='flex flex-col'>
                            <label className='text-sm cursor-pointer mb-1 font-semibold' htmlFor='role'>Role:</label>
                            <select className='focus:shadow-purpleShadow duration-300 outline-none shadow-md px-3 py-3 rounded-md w-full text-sm' name="" id="role">
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-between py-4'>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" />
                            <p className='text-sm'>Remember me</p>
                        </div>
                        <Link className='text-sm text-purpleBlue'>Reset password!</Link>
                    </div>
                    <button onClick={handelSubmit} className='bg-purpleBlue rounded-md text-sm font-semibold text-white w-full py-2' type='button'>Login</button>
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