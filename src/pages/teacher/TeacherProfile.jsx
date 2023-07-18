import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { UseAuthContext } from '../../context/Authentication'
import { useEffect } from 'react'
import Teacherform from "../../InitialStates/Teacherform";
import axios from 'axios'
import Button from '../../components/Button'
import Spinner from '../../components/Spinner'
import extractToken from '../../Utils/ExtractToken'

const TeacherProfile = () => {
	const { user } = UseAuthContext();
	const [uploading, setUploading] = useState(false)
	const [formState, setFormState] = useState(Teacherform);

	useEffect(() => {
		if (user?.role === "teacher") {
			console.log(user)
			setFormState(user)
		}
	}, [user]);


	const handleSubmit = (e) => {
		e.preventDefault();
		axios(`${process.env.REACT_APP_BASE_URL}/teacher/${user?._id}`, {
			method: "PATCH",
			data: formState,
			headers: {
				Authorization: `Bearer ${extractToken()?.token}`
			},
		})
	}

	const uploadImg = (e) => {
		setUploading(true)
		const formData = new FormData();
		formData.append("file", e.target.files[0]);
		formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
		formData.append("folder", "teacher");

		fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then(async (data) => {
				axios(`${process.env.REACT_APP_BASE_URL}/teacher/${user?._id}`, {
					method: "PATCH",
					headers: {
						Authorization: `Bearer ${extractToken()?.token}`
					},
					data: {
						photoURL: data.secure_url
					}
				})
					.then((res) => {
						setUploading(false)
						window.location.reload()
					})
			})
	}

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}
	return (
		<>
			<Navbar />
			<section className='w-screen min-h-screen p-10 px-20 Nunito'>
				<h1 className='font-bold text-3xl text-center'>Profile</h1>
				<div>
					<form onSubmit={handleSubmit} >
						<img src={formState?.photoURL} className='h-28 w-28 rounded-full object-cover m-auto' alt="" />
						<div className="mt-5 grid gap-4 mb-4 sm:grid-cols-2">
							<Input onChange={handleChange} value={formState?.fullname} required={true} id="fullname" type={"text"} label={'Full Name'} placeholder={'Enter your full name.'} />
							<Input onChange={handleChange} value={formState?.email} required={true} type="email" id="email" label={'Email'} placeholder={'Enter your email'} />
							<Input onChange={handleChange} value={formState?.phoneNumber} required={true} type="text" id="phoneNumber" label={'Phone Number'} placeholder="Phone Number" />
							<Input onChange={handleChange} value={formState?.username} required={true} readOnly={true} type="text" id="username" label={'Username'} placeholder="Username" />
							<div className='flex gap-2 items-center'>
								<Input className={uploading ? "flex-1" : "w-full"} onChange={uploadImg} accept={"image/*"} required={true} readOnly={true} type="file" id="photo" label={'Profile Picture'} placeholder="Profile Image" />
								{uploading && <Spinner color={"dark"} />}
							</div>
						</div>
						<div className="flex items-center space-x-4 justify-center">
							<Button type='submit' text='Submit' className={'w-max px-10 mt-4 min-w-[150px]'} />
						</div>
					</form>
				</div>
			</section>
		</>
	)
}

export default TeacherProfile
