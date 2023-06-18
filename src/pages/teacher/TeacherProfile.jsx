import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { UseAuthContext } from '../../context/Authentication'
import { useEffect } from 'react'
import Teacherform from "../../InitialStates/Teacherform";

const TeacherProfile = () => {
	const {user} = UseAuthContext();
	const [formState, setFormState] = useState(Teacherform);
	
	useEffect(() => {
		if (user?.role === "teacher") {
			setFormState(user)
		}
	}, [user]);
	return (
		<>
			<Navbar />
			<section className='w-screen min-h-screen p-10 px-20 Nunito'>
				<h1 className='font-bold text-3xl text-center'>Profile</h1>
				<div>
					<form action="#" >
						<div className="mt-5 grid gap-4 mb-4 sm:grid-cols-2">
							<Input value={formState?.fullname} required={true} id="fullname" type={"text"} label={'Full Name'} placeholder={'Enter your full name.'} />
							<Input value={formState?.email} required={true} type="email" id="email" label={'Email'} placeholder={'Enter your email'} />
							<Input value={formState?.phoneNumber} required={true} type="text" id="phoneNumber" label={'Phone Number'} placeholder="Phone Number" />
							<Input value={formState?.username} required={true} readOnly={true} type="text" id="username" label={'Username'} placeholder="Username" />
							<Input value={formState?.salaryType} readOnly={true} required={true} label={'Salary Type'} placeholder="Salary type" />
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

export default TeacherProfile
