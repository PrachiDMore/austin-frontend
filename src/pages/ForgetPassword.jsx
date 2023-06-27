import Input from '../components/Input'
import Select from '../components/Select'
import Button from '../components/Button'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ForgetPassword = () => {
	const [send, setSend] = useState(false)
	const [email, setEmail] = useState("");
	const [type, setType] = useState("student");
	const [loading, setLoading] = useState(false)
	const [resData, setResData] = useState()
	const navigate = useNavigate()
	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		axios(`${process.env.REACT_APP_BASE_URL}/email/reset-password`, {
			method: "POST",
			data: {
				email: email,
				type: type
			}
		})
			.then((res) => {
				if (res.data.error) {
					setLoading(false)
					console.error(res.data.message)
				} else {
					setLoading(false)
					setSend(true)
					setResData(res.data.data)
					console.log(res.data.message)
				}
			})
	}
	return (
		<>
			<section className='bg-white w-screen h-screen flex justify-center py-20'>
				{!send ? <form onSubmit={handleSubmit} className='w-1/2 h-1/2 bg-white p-4 flex items-center flex-col'>
					<h1 className='text-3xl font-bold mb-1'>Forget password?</h1>
					<p className='font-semibold text-gray-600'>No worries, we'll send you reset instructions.</p>
					<div className='w-10/12 flex flex-col mt-3 gap-3'>
						<Select onChange={(e) => { setType(e.target.value) }} value={type} placeholder={"Enter your role"} label={"Role"} options={[{ label: "Admin", value: "admin" }, { label: "Student", value: "student" }, { label: "Teacher", value: "teacher" }, { label: "Branch Manager", value: "branch-manager" },]} />
						<Input type={"email"} onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder={"Enter your email address"} label={"Email address"} />
						<Button loading={loading} className={"w-full mt-3"} text='Reset Password' type='submit' />
						<Link className='flex items-center justify-center gap-2 mt-5 font-semibold text-darkPurple' to={"/signin"}><HiOutlineArrowNarrowLeft className='text-xl' /> <p>Back to login</p></Link>
					</div>
				</form> : <form className='w-1/2 h-1/2 bg-white p-4 flex items-center flex-col'>
					<h1 className='text-3xl font-bold mb-3'>Check your email</h1>
					<p className='font-semibold text-gray-600 text-center'>We sent a password reset link to <br /> <span className='font-bold'>{email}</span> </p>
					<div className='w-10/12 mt-3'>
						<Button onClick={() => { window.location.href = `https://mail.google.com/mail/u/0/#advanced-search/from=${resData.from}&to=${resData.to}&subject=${resData.subject}` }} className={"w-full mt-6"} text='Open email app' />
						<p className='text-center mt-4'>Didn't receive the email? <b onClick={handleSubmit} className='text-darkPurple cursor-pointer'>Click to resend</b></p>
						<Link className='flex items-center justify-center gap-2 mt-8 font-semibold text-darkPurple' to={"/signin"}><HiOutlineArrowNarrowLeft className='text-xl' /> <p>Back to login</p></Link>
					</div>
				</form>}
			</section>
		</>
	)
}

export default ForgetPassword
