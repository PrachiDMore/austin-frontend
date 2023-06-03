import React, { useState } from 'react'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'
import Alert from '../components/Alert'
import { UseAuthContext } from '../context/Authentication'
import extractToken from '../Utils/ExtractToken'

const Signin = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("student");
    const {setAuthToken} = UseAuthContext()
    const navigate = useNavigate()
    const initialState = {
        username: '',
        password: ''
    }
    const [formState, setFormState] = useState(initialState)

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (formState.username?.length > 6 && formState.password.length > 6) {
            setLoading(true)
            if (type === "student") {
                axios(`${process.env.REACT_APP_BASE_URL}/user/signin/student`, {
                    method: "POST",
                    data: formState
                })
                    .then((res) => {
                        setLoading(false)
                        if (res.error) {
                            console.log(res.error)
                        }else{
                            sessionStorage.setItem(btoa("token"), window.btoa(JSON.stringify({token: res.data.token, role: "student"})))
                            setAuthToken(extractToken()?.token)
                            navigate("/student/profile")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        setLoading(false)
                    })
            }
        } else {
            setMessage('Please properly fill the form!')
        }
    }

    return (
        <>
            <Alert message={message} setMessage={setMessage} />
            <section className='h-[100vh] w-[100vw] flex Nunito'>
                <div className='w-[50%] bg-darkPurple'></div>
                <div className='w-[50%] h-full p-20 bg-lightGray flex flex-col justify-center '>
                    <h1 className='text-3xl font-bold text-center mb-6'>Hello! Welcome Back</h1>
                    <div className='w-full pt-4 flex flex-col gap-y-3'>
                        <div className='flex flex-col'>
                            <label className='text-sm cursor-pointer mb-1 font-bold' htmlFor='role'>Role:</label>
                            <select onChange={(e) => { setType(e.target.value) }} value={type} className='focus:shadow-purpleShadow duration-300 outline-none shadow-md px-4 py-3 rounded-md w-full' name="" id="role">
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <Input onChange={handleChange} value={formState.username} id={'username'} label={'Username'} type={'text'} placeholder={'Enter your username.'} />
                        <Input password={true} onChange={handleChange} value={formState.password} id={'password'} label={'Password'} type={'password'} placeholder={'Enter your password.'} />
                    </div>
                    <div className='flex justify-end py-4'>
                        <Link className='text-sm font-semibold text-darkPurple'>forget password?</Link>
                    </div>
                    <Button onClick={handleSubmit} text='Login' loading={loading} />
                    <div className='flex gap-2 py-4 text-sm font-bold justify-center'>
                        <p>Don't have an account?</p>
                        <Link to='/signup' className='text-darkPurple'>Create Account</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signin