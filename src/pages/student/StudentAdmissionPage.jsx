import React, { useEffect, useState } from 'react'
import extractToken from '../../Utils/ExtractToken';
import { useNavigate, useParams } from 'react-router-dom';
import { UseAuthContext } from '../../context/Authentication';
import axios from 'axios';
import Alert from '../../components/Alert';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import admissionFormInitialState from '../../InitialStates/AdmissionForm';
import Spinner from '../../components/Spinner';
import { AiOutlineLink } from 'react-icons/ai'

const StudentAdmissionPage = () => {
	const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined });
	const [formState, setFormState] = useState(admissionFormInitialState);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();
	const [uploading, setUploading] = useState(false)
	const [data, setData] = useState()
	const { authToken, user } = UseAuthContext();

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}

	useEffect(() => {
		setFormState(user)
	}, [user]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true)
		if (formState?.confirmed || extractToken()?.role === `${process.env.REACT_APP_STUDENT_ROLE}`) {
			if (formState?.firstname && formState?.lastname && formState?.middlename && formState?.DOB && formState?.gender && formState?.address && formState?.city && formState?.state && formState?.pincode && formState?.nationality && formState?.email && formState?.mobileNoPrimary && formState?.admissionYear && formState?.grade && formState?.father_name && formState?.mother_name && formState?.grade) {
				axios(`${process.env.REACT_APP_BASE_URL}/admission/${formState?._id}`, {
					method: 'PATCH',
					data: formState
				})
					.then((res) => {
						if (res.data.error) {
							setMessage(res.data.message)
							setLoading(false)
						} else {
							setMessage(res.data.message)
							setLoading(false)
							console.log("updated")
						}
					})
					.catch((err) => {
						setLoading(false)
					})
			}
		}
	}

	const uploadImg = (e) => {
		setUploading(true)
		const formData = new FormData();
		formData.append("file", e.target.files[0]);
		formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
		formData.append("folder", "admission");

		fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then(async (data) => {
				axios(`${process.env.REACT_APP_BASE_URL}/admission/${user?._id}`, {
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
	return (
		<>
			<Alert message={message} setMessage={setMessage} />
			<section className='w-screen min-h-screen Nunito'>
				<Navbar />
				<form onSubmit={handleSubmit} className='w-full p-10 px-20 flex flex-col items-center'>
					<div className='text-center text-3xl font-bold p-4 '>Profile</div>
					{formState?.photoURL && <div className='my-3 rounded-lg'>
						<img className='h-32 w-32 object-cover rounded-lg' src={formState?.photoURL} alt="" />
					</div>}
					<div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
						<h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Personal Information:</h1>
						<div className='grid grid-cols-3 gap-6 w-full '>
							<Input value={formState?.username} readOnly={true} required={true} id={'username'} type={"text"} label={'Username'} placeholder={'Enter username.'} />
							<Input value={formState?.firstname} required={true} onChange={handleChange} id={'firstname'} type={"text"} label={'First Name'} placeholder={'Enter your first name.'} />
							<Input value={formState?.middlename} required={true} onChange={handleChange} id={'middlename'} type={"text"} label={'Middle Name'} placeholder={'Enter your middle name.'} />
							<Input value={formState?.lastname} required={true} onChange={handleChange} id={'lastname'} type={"text"} label={'Last Name'} placeholder={'Enter your last name.'} />
							<div className='flex gap-2 items-center'>
								<Input className={uploading ? "flex-1" : "w-full"} onChange={uploadImg} accept={"img/*"} required={true} readOnly={true} type="file" id="photo" label={'Profile Picture'} placeholder="Profile Image" />
								{uploading && <Spinner color={"dark"} />}
								{formState?.photoURL && !uploading && <a href={formState?.photoURL}><AiOutlineLink className='text-xl text-blue-700' /></a>}
							</div>
							<Select value={formState?.gender} required={true} onChange={handleChange} id={'gender'} label={'Gender'} options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Transgender', value: 'transgender' }]} />
							<Input value={formState?.DOB} required={true} onChange={handleChange} id={'DOB'} type={"date"} label={'Date of Birth'} placeholder={'Enter your last name.'} />
							<Input value={formState?.address} required={true} onChange={handleChange} id={'address'} type={"text"} label={'Address'} placeholder={'Enter your address.'} />
							<Input value={formState?.landmark} onChange={handleChange} id={'landmark'} type={"text"} label={'Landmark'} placeholder={'Enter your landmark (optional).'} />
							<Input value={formState?.city} required={true} onChange={handleChange} id={'city'} type={"text"} label={'City'} placeholder={'Enter your city.'} />
							<Input value={formState?.state} required={true} onChange={handleChange} id={'state'} type={"text"} label={'State'} placeholder={'Enter your state.'} />
							<Input value={formState?.pincode} required={true} onChange={handleChange} id={'pincode'} type={"text"} label={'Pincode'} placeholder={'Enter your pincode.'} />
							<Input value={formState?.nationality} required={true} onChange={handleChange} id={'nationality'} type={"text"} label={'Nationality'} placeholder={'Enter your nationality.'} />
							<Input value={formState?.email} required={true} onChange={handleChange} id={'email'} type={"email"} label={'Email'} placeholder={'Enter your email.'} />
							<Input value={formState?.mobileNoPrimary} required={true} onChange={handleChange} id={'mobileNoPrimary'} type={"text"} label={'Mobile Number 1'} placeholder={'Enter your mobile number.'} />
							<Input value={formState?.mobileNoSecondary} onChange={handleChange} id={'mobileNoSecondary'} type={"text"} label={'Mobile Number 2'} placeholder={'Enter your alternate mobile number.'} />
							<Input value={formState?.admissionYear} required={true} onChange={handleChange} id={'admissionYear'} type={"text"} label={'Admission Year'} placeholder={'Enter your admission Year.'} />
							<Input value={formState?.grade} required={true} onChange={handleChange} id={'grade'} type={"text"} label={'Grade'} placeholder={'Enter your grade.'} />
						</div>
					</div>
					<div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
						<h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Father's Information:</h1>
						<div className='grid grid-cols-3 gap-6 w-full '>
							<Input value={formState?.father_name} required={true} onChange={handleChange} id={'father_name'} type={"text"} label={'Father Name'} placeholder={`Enter your father's name.`} />
							<Input value={formState?.father_phone_number} onChange={handleChange} id={'father_phone_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your father's number.`} />
							<Input value={formState?.father_email} onChange={handleChange} id={'father_email'} type={"email"} label={'Email'} placeholder={`Enter your father's email.`} />
							<Input value={formState?.father_occupation} onChange={handleChange} id={'father_occupation'} type={"text"} label={`Father's Occupation`} placeholder={`Enter your father's occupation.`} />
						</div>
					</div>
					<div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
						<h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Mother's Information:</h1>
						<div className='grid grid-cols-3 gap-6 w-full '>
							<Input value={formState?.mother_name} required={true} onChange={handleChange} id={'mother_name'} type={"text"} label={'Mother Name'} placeholder={`Enter your mother's name.`} />
							<Input value={formState?.mother_phone_number} onChange={handleChange} id={'mother_phone_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your mother's number.`} />
							<Input value={formState?.mother_email} onChange={handleChange} id={'mother_email'} type={"email"} label={'Email'} placeholder={`Enter your mother's email.`} />
							<Input value={formState?.mother_occupation} onChange={handleChange} id={'mother_occupation'} type={"text"} label={`Mother's Occupation`} placeholder={`Enter your mother's occupation.`} />
						</div>
					</div>
					<div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
						<h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Guardian's Information:</h1>
						<div className='grid grid-cols-3 gap-6 w-full '>
							<Input value={formState?.guardian_name} onChange={handleChange} id={'guardian_name'} type={"text"} label={'Guardian Name'} placeholder={`Enter your guardian's name.`} />
							<Input value={formState?.guardian_phone_number} onChange={handleChange} id={'guardian_phone_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your guardian's number.`} />
							<Input value={formState?.guardian_email} onChange={handleChange} id={'guardian_email'} type={"email"} label={'Email'} placeholder={`Enter your guardian's email.`} />
							<Input value={formState?.guardian_occupation} onChange={handleChange} id={'guardian_occupation'} type={"text"} label={`Guardian's Occupation`} placeholder={`Enter your guardian's occupation.`} />
						</div>
					</div>
					<Button type='submit' text='Submit' className={'w-max px-10 mt-4 min-w-[150px]'} loading={loading} />
				</form>
			</section>
		</>
	)
}

export default StudentAdmissionPage