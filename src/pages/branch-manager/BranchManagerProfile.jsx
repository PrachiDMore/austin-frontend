import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { UseAuthContext } from '../../context/Authentication'
import { useEffect } from 'react'
import Teacherform from "../../InitialStates/Teacherform";
import BranchManagerInitialState from '../../InitialStates/BranchManagerInitialState'
import Alert from '../../components/Alert'
import axios from 'axios'
import extractToken from '../../Utils/ExtractToken'
import Button from '../../components/Button'

const BranchManagerProfile = () => {
	const { user } = UseAuthContext();
	const [formState, setFormState] = useState(BranchManagerInitialState);
	const [message, setMessage] = useState("")
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}

	useEffect(() => {
		if (user?.role === "branch-manager") {
			setFormState(user)
		}
	}, [user]);

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		axios(`${process.env.REACT_APP_BASE_URL}/branch-manager/${user?._id}`, {
			method: "PATCH",
			data: formState,
			headers: {
				Authorization: `Bearer ${extractToken()?.token}`
			},
		})
			.then((res) => {
				setLoading(false)
				if (res.data.error) {
					setMessage(res.data.message)
				} else {
					setMessage(res.data.message)
				}
			})
			.catch((err) => {
				setMessage(err.message)
				setLoading(false)
			})
	}
	return (
		<>
			<Alert message={message} setMessage={setMessage} />
			<Navbar />
			<section className='w-screen min-h-screen p-10 px-20 Nunito'>
				<h1 className='font-bold text-3xl text-center'>Profile</h1>
				<div>
					<form action="#" onSubmit={handleSubmit}>
						<div className="mt-5 grid gap-4 mb-4 sm:grid-cols-2">
							<Input onChange={handleChange} value={formState?.firstname} required={true} id="firstname" type={"text"} label={'First Name'} placeholder={'Enter your first name.'} />
							<Input onChange={handleChange} value={formState?.lastname} required={true} id="lastname" type={"text"} label={'Last Name'} placeholder={'Enter your last name.'} />
							<Input onChange={handleChange} value={formState?.email} required={true} type="email" id="email" label={'Email'} placeholder={'Enter your email'} />
							<Input onChange={handleChange} value={formState?.phonenumber} required={true} type="text" id="phonenumber" label={'Phone Number'} placeholder="Phone Number" />
							<Input onChange={handleChange} value={formState?.username} required={true} readOnly={true} type="text" id="username" label={'Username'} placeholder="Username" />
						</div>
						<div className="flex items-center space-x-4 justify-center">
							{/* <Button type='submit' text='Submit' className={'w-max px-10 mt-4 min-w-[150px]'} loading={loading} /> */}
						</div>
					</form>
				</div>
			</section>
		</>
	)
}

export default BranchManagerProfile