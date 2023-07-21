import React, { useEffect, useRef, useState } from 'react'
import Input from '../components/Input'
import Navbar from '../components/Navbar'
import admissionFormInitialState from '../InitialStates/AdmissionForm'
import Select from '../components/Select'
import Button from '../components/Button'
import axios from 'axios'
import Alert from '../components/Alert'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { UseAdmissionContext } from '../context/Admission'
import updateElementsInArray from '../Utils/UpdateUniqueElemetnsInArray'
import { UseAuthContext } from '../context/Authentication'
import extractToken from '../Utils/ExtractToken'
import RulesAndRegulations from '../Modals/RulesAndRegulations'
import { v4 as uuidv4 } from 'uuid';
import Checkbox from '../components/Checkbox'
import Spinner from "../components/Spinner";
import { AiOutlineLink } from "react-icons/ai";

const AdmissionPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [disableLoading, setDisableLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { _id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState()
    const [checked, setChecked] = useState(false)
    const location = useLocation();
    const [img, setImg] = useState()
    const admissionRef = useRef()
    const { formState, setFormState } = UseAdmissionContext()

    useEffect(() => {
        if (_id) {
            axios(`${process.env.REACT_APP_BASE_URL}/admission/student/${_id}`, {
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                },
                method: "GET"
            })
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
        }
    }, [_id]);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location?.pathname?.includes("/view/admission")) {
            return;
        }
        setLoading(true)
        if (_id && !formState?.confirmed) {
            if (formState?.firstname && formState?.lastname && formState?.middlename && formState?.DOB && formState?.gender && formState?.address && formState?.city && formState?.state && formState?.pincode && formState?.nationality && formState?.email && formState?.mobileNoPrimary && formState?.admissionYear && formState?.grade && formState?.father_name && formState?.mother_name && formState?.grade) {
                axios(`${process.env.REACT_APP_BASE_URL}/admission/confirm/${_id}`, {
                    method: 'PATCH',
                    data: formState,
                    headers: {
                        Authorization: `Bearer ${extractToken()?.token}`
                    }
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
                console.log('Form incompletely filled')
            }
        } else if (formState?.confirmed && extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}`) {
            if (formState?.firstname && formState?.lastname && formState?.middlename && formState?.DOB && formState?.gender && formState?.address && formState?.city && formState?.state && formState?.pincode && formState?.nationality && formState?.email && formState?.mobileNoPrimary && formState?.admissionYear && formState?.grade && formState?.father_name && formState?.mother_name && formState?.grade) {
                axios(`${process.env.REACT_APP_BASE_URL}/admission/${formState?._id}`, {
                    method: 'PATCH',
                    data: formState,
                    headers: {
                        Authorization: `Bearer ${extractToken()?.token}`
                    }
                })
                    .then((res) => {
                        if (res.data.error) {
                            setMessage(res.data.message)
                            setLoading(false)
                        } else {
                            setMessage(res.data.message)
                            setLoading(false)
                            if (extractToken()?.role === `${process.env.REACT_APP_STUDENT_ROLE}`) {
                                console.log("updated")
                            } else if (extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}`) {
                                navigate("/admin/admissions")
                            }
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
            } else {
                setLoading(false)
                console.log('Form incompletely filled')
            }
        } else {
            if (formState?.firstname && formState?.lastname && formState?.middlename && formState?.DOB && formState?.gender && formState?.address && formState?.city && formState?.state && formState?.pincode && formState?.nationality && formState?.email && formState?.mobileNoPrimary && formState?.admissionYear && formState?.father_name && formState?.mother_name && formState?.grade && img) {
                setUploading(true)
                const formData = new FormData();
                formData.append("file", img);
                formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
                formData.append("folder", "admission");
                fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => response.json())
                    .then(async (data) => {
                        setUploading(false)
                        axios(`${process.env.REACT_APP_BASE_URL}/admission/create`, {
                            method: 'POST',
                            data: { ...formState, photoURL: data?.secure_url, username: uuidv4() },
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
                    })
            } else {
                setLoading(false)
                console.log('Form incompletely filled', formState)
            }
        }
    }
    const handleIsDisabled = (e) => {
        setDisableLoading(true)
        axios(`${process.env.REACT_APP_BASE_URL}/admission/disabled/${_id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${extractToken()?.token}`
            },
            data: { isDisabled: e }
        })
            .then((res) => {
                setDisableLoading(false)
                navigate("/admin/admissions")
            })
            .catch((err) => {
                setDisableLoading(false)
            })
    }

    const handlePrint = async () => {
        window.print()
    }
    return (
        <>
            {!location?.pathname?.includes("/view/admission/") && <Alert message={message} setMessage={setMessage} />}
            <RulesAndRegulations checked={checked} setChecked={setChecked} showModal={showModal} setShowModal={setShowModal} />
            <section ref={admissionRef} className='w-screen min-h-screen Nunito'>
                {!location?.pathname?.includes("/view/admission/") && <Navbar />}
                <form onSubmit={handleSubmit} className={location?.pathname?.includes("/view/admission/") ? 'w-full p-8 flex flex-col items-center' : 'w-full p-10 px-20 flex flex-col items-center'}>
                    <div className={location?.pathname?.includes("/view/admission/") ? 'text-center text-3xl font-bold p-4 ' : 'text-3xl font-bold p-4 '}>Admission Form</div>
                    <div className={extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}` && formState?.confirmed && _id ? "w-full flex justify-between items-center" : "w-full flex justify-between items-center"}>
                        {extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}` && formState?.confirmed && _id && <Button type='button' text='Enable' className={"w-52 pointer-events-none opacity-0"} />}
                        {extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}` && formState?.confirmed && _id && <Button onClick={() => {
                            handleIsDisabled(!formState?.isDisabled)
                        }} text={formState?.isDisabled ? 'Enable' : 'Disable'} loading={disableLoading} type='button' className={"w-52"} />}
                    </div>
                    {formState?.photoURL && <div className='my-3 rounded-lg'>
                        <img className='h-32 w-32 object-cover rounded-lg' src={formState?.photoURL} alt="" />
                    </div>}
                    <div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Personal Information:</h1>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full '>
                            {extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}` && _id && <Input value={formState?.username} required={true} onChange={handleChange} id={'username'} type={"text"} label={'Username'} placeholder={'Enter username.'} />}
                            {extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}` && !formState?.confirmed && _id && <Input required={true} onChange={handleChange} id={'password'} type={"text"} label={'Password'} placeholder={'Enter password.'} />}
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.firstname} required={true} onChange={handleChange} id={'firstname'} type={"text"} label={'First Name'} placeholder={'Enter your first name.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.middlename} required={true} onChange={handleChange} id={'middlename'} type={"text"} label={'Middle Name'} placeholder={'Enter your middle name.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.lastname} required={true} onChange={handleChange} id={'lastname'} type={"text"} label={'Last Name'} placeholder={'Enter your last name.'} />
                            <div className='flex gap-2 items-center'>
                                <Input className={uploading ? "flex-1" : "w-full"} onChange={(e) => {
                                    setImg(e.target.files[0])
                                }} accept={"img/*"} required={true} readOnly={true} type="file" id="photo" label={'Profile Picture'} placeholder="Profile Image" />
                                {uploading && <Spinner color={"dark"} />}
                                {formState?.photoURL && !uploading && <a href={formState?.photoURL}><AiOutlineLink className='text-xl text-blue-700' /></a>}
                            </div>
                            <Select readOnly={location?.pathname?.includes("/view/admission")} value={formState?.gender} required={true} onChange={handleChange} id={'gender'} label={'Gender'} options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.DOB} required={true} onChange={handleChange} id={'DOB'} type={"date"} label={'Date of Birth'} placeholder={'Enter your last name.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.address} required={true} onChange={handleChange} id={'address'} type={"text"} label={'Address'} placeholder={'Enter your address.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.landmark} onChange={handleChange} id={'landmark'} type={"text"} label={'Landmark'} placeholder={'Enter your landmark (optional).'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.city} required={true} onChange={handleChange} id={'city'} type={"text"} label={'City'} placeholder={'Enter your city.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.state} required={true} onChange={handleChange} id={'state'} type={"text"} label={'State'} placeholder={'Enter your state.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.pincode} required={true} onChange={handleChange} id={'pincode'} type={"text"} label={'Pincode'} placeholder={'Enter your pincode.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.nationality} required={true} onChange={handleChange} id={'nationality'} type={"text"} label={'Nationality'} placeholder={'Enter your nationality.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.email} required={true} onChange={handleChange} id={'email'} type={"email"} label={'Email'} placeholder={'Enter your email.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.mobileNoPrimary} required={true} onChange={handleChange} id={'mobileNoPrimary'} type={"text"} label={'Mobile Number 1'} placeholder={'Enter your mobile number.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.mobileNoSecondary} onChange={handleChange} id={'mobileNoSecondary'} type={"text"} label={'Mobile Number 2'} placeholder={'Enter your alternate mobile number.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.admissionYear} required={true} onChange={handleChange} id={'admissionYear'} type={"text"} label={'Admission Year'} placeholder={'Enter your admission Year.'} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.grade} required={true} onChange={handleChange} id={'grade'} type={"text"} label={'Grade'} placeholder={'Enter your grade.'} />
                        </div>
                    </div>
                    <div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Father's Information:</h1>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full '>
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.father_name} required={true} onChange={handleChange} id={'father_name'} type={"text"} label={'Father Name'} placeholder={`Enter your father's name.`} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.father_phone_number} onChange={handleChange} id={'father_phone_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your father's number.`} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.father_email} onChange={handleChange} id={'father_email'} type={"email"} label={'Email'} placeholder={`Enter your father's email.`} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.father_occupation} onChange={handleChange} id={'father_occupation'} type={"text"} label={`Father's Occupation`} placeholder={`Enter your father's occupation.`} />
                        </div>
                    </div>
                    <div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Mother's Information:</h1>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full '>
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.mother_name} required={true} onChange={handleChange} id={'mother_name'} type={"text"} label={'Mother Name'} placeholder={`Enter your mother's name.`} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.mother_phone_number} onChange={handleChange} id={'mother_phone_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your mother's number.`} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.mother_email} onChange={handleChange} id={'mother_email'} type={"email"} label={'Email'} placeholder={`Enter your mother's email.`} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.mother_occupation} onChange={handleChange} id={'mother_occupation'} type={"text"} label={`Mother's Occupation`} placeholder={`Enter your mother's occupation.`} />
                        </div>
                    </div>
                    <div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Guardian's Information:</h1>
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full '>
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.guardian_name} onChange={handleChange} id={'guardian_name'} type={"text"} label={'Guardian Name'} placeholder={`Enter your guardian's name.`} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.guardian_phone_number} onChange={handleChange} id={'guardian_phone_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your guardian's number.`} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.guardian_email} onChange={handleChange} id={'guardian_email'} type={"email"} label={'Email'} placeholder={`Enter your guardian's email.`} />
                            <Input readOnly={location?.pathname?.includes("/view/admission")} value={formState?.guardian_occupation} onChange={handleChange} id={'guardian_occupation'} type={"text"} label={`Guardian's Occupation`} placeholder={`Enter your guardian's occupation.`} />
                        </div>
                    </div>
                    {!_id && <div className='flex justify-center mt-4 gap-2'>
                        <Checkbox required={true} reverse={true} id={"rules-and-regulations"} onChange={(e) => { setChecked(e.target.checked) }} />
                        <p>I agree to the <Link to={"/rules-and-regulations"} className='font-semibold text-darkPurple underline underline-offset-2'>terms and conditions</Link></p>
                    </div>}
                    {!_id && <Button disabled={!_id && !checked} type='submit' text='Submit' className={'w-max px-10 mt-4 min-w-[150px]'} loading={loading} />}
                    {_id && !formState?.confirmed && !location?.pathname?.includes("/view/admission") && <Button disabled={formState?.confirmed} type='submit' text={formState?.confirmed ? "Already Confirmed" : 'Save & Confirm Admission'} className={'w-max px-10 mt-4 min-w-[150px]'} loading={false} />}
                    {_id && formState?.confirmed && !location?.pathname?.includes("/view/admission") && <Button type='submit' text={"Submit"} className={'w-max px-10 mt-4 min-w-[150px]'} loading={false} />}
                    {_id && location?.pathname?.includes("/view/admission") && <Button type='button' text={"Print"} onClick={() => {
                        handlePrint()
                    }} className={'w-max px-10 mt-4 min-w-[150px]'} loading={false} />}
                </form>
            </section>
        </>
    )
}

export default AdmissionPage