import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Navbar from '../components/Navbar'
import admissionFormInitialState from '../InitialStates/AdmissionForm'
import Select from '../components/Select'
import Button from '../components/Button'
import axios from 'axios'
import Alert from '../components/Alert'
import { useNavigate, useParams } from 'react-router-dom'
import StudentModal from '../Modals/StudentModal'
import { UseAdmissionContext } from '../context/Admission'
import updateElementsInArray from '../Utils/UpdateUniqueElemetnsInArray'
import { UseAuthContext } from '../context/Authentication'
import extractToken from '../Utils/ExtractToken'

const AdmissionPage = () => {
    const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined });
    const [formState, setFormState] = useState(admissionFormInitialState);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { _id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState()
    const { authToken, user } = UseAuthContext();
    useEffect(() => {
        if (_id) {
            axios(`${process.env.REACT_APP_BASE_URL}/admission/student/${_id}`)
                .then((res) => {
                    if (res.data.error) {
                        setMessage(res.data.message)
                    } else {
                        setData(res.data.admission)
                        setFormState(res.data.admission)
                    }
                })
                .catch((err) => {
                    setMessage(err.message)
                })
        } else {
            setFormState(user)
        }
    }, [_id, user]);
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (_id && !formState?.confirmed) {
            console.log(formState.password, formState.username)
            if (formState?.firstname && formState?.lastname && formState?.middlename && formState?.DOB && formState?.gender && formState?.address && formState?.city && formState?.state && formState?.pincode && formState?.nationality && formState?.email && formState?.mobileNoPrimary && formState?.admissionYear && formState?.grade && formState?.father_name && formState?.mother_name && formState?.grade) {
                axios(`${process.env.REACT_APP_BASE_URL}/admission/confirm/${_id}`, {
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
                            navigate("/admin/admissions")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        setLoading(false)
                    })
            } else {
                setLoading(false)
                alert('Form incompletely filled')
            }
        } else if (formState?.confirmed || extractToken()?.role === "student") {
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
                            if (extractToken()?.role === "student") {
                                alert("updated")
                            } else if (extractToken()?.role === "admin") {
                                navigate("/admin/admissions")
                            }
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
            } else {
                setLoading(false)
                alert('Form incompletely filled')
            }
        } else {
            if (formState?.firstname && formState?.lastname && formState?.middlename && formState?.DOB && formState?.gender && formState?.address && formState?.city && formState?.state && formState?.pincode && formState?.nationality && formState?.email && formState?.mobileNoPrimary && formState?.admissionYear && formState?.grade && formState?.father_name && formState?.mother_name && formState?.grade) {
                axios(`${process.env.REACT_APP_BASE_URL}/admission/create`, {
                    method: 'POST',
                    data: formState
                })
                    .then((res) => {
                        if (res.data.error) {
                            setMessage(res.data.message)
                            setLoading(false)
                        } else {
                            setMessage(res.data.message)
                            setLoading(false)
                            setFormState(admissionFormInitialState);
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
            } else {
                setLoading(false)
                alert('Form incompletely filled')
            }
        }
    }
    return (
        <>
            <StudentModal setShowModal={setShowModal} showModal={showModal} />
            <Alert message={message} setMessage={setMessage} />
            <section className='w-screen min-h-screen Nunito'>
                <Navbar />
                <form onSubmit={handleSubmit} className='w-full p-10 px-20 flex flex-col items-center'>
                    <div className={"w-full flex justify-center"}>
                        <div className='text-3xl font-bold p-4 '>Admission Form</div>
                    </div>
                    <div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Personal Information:</h1>
                        <div className='grid grid-cols-3 gap-6 w-full '>
                            {extractToken()?.role === "admin" && _id && <Input value={formState?.username} required={true} onChange={handleChange} id={'username'} type={"text"} label={'Username'} placeholder={'Enter username.'} />}
                            {extractToken()?.role === "admin" && !formState?.confirmed && _id && <Input required={true} onChange={handleChange} id={'password'} type={"text"} label={'Password'} placeholder={'Enter password.'} />}
                            {extractToken()?.role === "student" && !_id && <Input value={formState?.username} readOnly={true} required={true} onChange={handleChange} id={'username'} type={"text"} label={'Username'} placeholder={'Enter username.'} />}
                            <Input value={formState?.firstname} required={true} onChange={handleChange} id={'firstname'} type={"text"} label={'First Name'} placeholder={'Enter your first name.'} />
                            <Input value={formState?.middlename} required={true} onChange={handleChange} id={'middlename'} type={"text"} label={'Middle Name'} placeholder={'Enter your middle name.'} />
                            <Input value={formState?.lastname} required={true} onChange={handleChange} id={'lastname'} type={"text"} label={'Last Name'} placeholder={'Enter your last name.'} />
                            <Input value={formState?.photoURL} onChange={handleChange} id={'photoURL'} type={"file"} label={'Profile Image'} />
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
                    {!_id && <Button type='submit' text='Submit' className={'w-max px-10 mt-4 min-w-[150px]'} loading={loading} />}
                    {_id && !formState?.confirmed && <Button disabled={formState?.confirmed} type='submit' text={formState?.confirmed ? "Already Confirmed" : 'Save & Confirm Admission'} className={'w-max px-10 mt-4 min-w-[150px]'} loading={false} />}
                    {_id && formState?.confirmed && <Button type='submit' text={"Submit"} className={'w-max px-10 mt-4 min-w-[150px]'} loading={false} />}
                </form>
            </section>
        </>
    )
}

export default AdmissionPage