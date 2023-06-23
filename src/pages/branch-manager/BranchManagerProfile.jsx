import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { UseAuthContext } from '../../context/Authentication'
import { useEffect } from 'react'
import Teacherform from "../../InitialStates/Teacherform";
import BranchManagerInitialState from '../../InitialStates/BranchManagerInitialState'

const BranchManagerProfile = () => {
	const {user} = UseAuthContext();
	const [formState, setFormState] = useState(BranchManagerInitialState);
	
	useEffect(() => {
		if (user?.role === "branch-manager") {
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
							<Input value={formState?.firstname} required={true} id="firstname" type={"text"} label={'First Name'} placeholder={'Enter your first name.'} />
							<Input value={formState?.lastname} required={true} id="lastname" type={"text"} label={'Last Name'} placeholder={'Enter your last name.'} />
							<Input value={formState?.email} required={true} type="email" id="email" label={'Email'} placeholder={'Enter your email'} />
							<Input value={formState?.phonenumber} required={true} type="text" id="phonenumber" label={'Phone Number'} placeholder="Phone Number" />
							<Input value={formState?.username} required={true} readOnly={true} type="text" id="username" label={'Username'} placeholder="Username" />
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