import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Select from '../components/Select'
import Input from '../components/Input'
import Button from '../components/Button'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import axios from 'axios'

const ResetPassword = () => {
	const { token } = useParams();
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		if (password === confirmPassword) {
			axios(`${process.env.REACT_APP_BASE_URL}/user/reset-password`, {
				method: "PATCH",
				data: {
					password: password
				},
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
				.then((res) => {
					if (res.data.error) {
						console.error(res.data.message)
					} else {
						console.log(res.data.message)
						navigate("/signin")
					}
				})
		} else {
			alert("Password doesn't match")
		}
	}
	return (
		<>
			<section className='bg-white w-screen h-screen flex justify-center py-20'>
				<form onSubmit={handleSubmit} className='w-1/2 h-1/2 bg-white p-4 flex items-center flex-col'>
					<h1 className='text-3xl font-bold mb-1'>Set new Password</h1>
					<p className='mt-2 text-center font-semibold text-gray-600'>Your password must be different to <br /> previously used passwords.</p>
					<div className='w-10/12 flex flex-col mt-3 gap-3'>
						<Input type={"password"} password={true} onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder={"Enter new password"} label={"Password"} />
						<Input type={"password"} password={true} onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} placeholder={"Confirm new password"} label={"Confirm Password"} />
						<Button className={"w-full mt-3"} text='Reset Password' type='submit' />
						<Link className='flex items-center justify-center gap-2 mt-5 font-semibold text-darkPurple' to={"/signin"}><HiOutlineArrowNarrowLeft className='text-xl' /> <p>Back to login</p></Link>
					</div>
				</form>
			</section>
		</>
	)
}

export default ResetPassword
