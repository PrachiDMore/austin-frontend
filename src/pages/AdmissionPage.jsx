import React, { useState } from 'react'
import Input from '../components/Input'
import Navbar from '../components/Navbar'
import admissionFormInitialState from '../InitialStates/AdmissionForm'
import Select from '../components/Select'

const AdmissionPage = () => {
    const [formState, setFormState] = useState(admissionFormInitialState);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formState.firstname && formState.lastname && formState.middlename && formState.DOB && formState.gender && formState.address && formState.city && formState.state && formState.pincode && formState.nationality && formState.email && formState.mobileNoPrimary && formState.admissionYear && formState.grade && formState.father_name && formState.mother_name && formState.grade) {

        }else{
            alert('Form incompletely filled')
        }
    }
    return (
        <>
            <section className='w-screen min-h-screen Nunito'>
                <Navbar />
                <form onSubmit={handleSubmit} className='w-full p-10 px-20 flex flex-col items-center'>
                    <div className='text-3xl font-bold p-4 '>Admission Form</div>
                    <div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Personal Information:</h1>
                        <div className='grid grid-cols-3 gap-6 w-full '>
                            <Input required={true} onChange={handleChange} id={'firstname'} type={"text"} label={'First Name'} placeholder={'Enter your first name.'} />
                            <Input required={true} onChange={handleChange} id={'middlename'} type={"text"} label={'Middle Name'} placeholder={'Enter your middle name.'} />
                            <Input required={true} onChange={handleChange} id={'lastname'} type={"text"} label={'Last Name'} placeholder={'Enter your last name.'} />
                            <Input onChange={handleChange} id={'photoURL'} type={"file"} label={'Profile Image'} />
                            <Select required={true} onChange={handleChange} id={'gender'} label={'Gender'} options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Transgender', value: 'transgender' }]} />
                            <Input required={true} onChange={handleChange} id={'DOB'} type={"date"} label={'Date of Birth'} placeholder={'Enter your last name.'} />
                            <Input required={true} onChange={handleChange} id={'address'} type={"text"} label={'Address'} placeholder={'Enter your address.'} />
                            <Input onChange={handleChange} id={'landmark'} type={"text"} label={'Landmark'} placeholder={'Enter your landmark (optional).'} />
                            <Input required={true} onChange={handleChange} id={'city'} type={"text"} label={'City'} placeholder={'Enter your city.'} />
                            <Input required={true} onChange={handleChange} id={'state'} type={"text"} label={'State'} placeholder={'Enter your state.'} />
                            <Input required={true} onChange={handleChange} id={'pincode'} type={"text"} label={'Pincode'} placeholder={'Enter your pincode.'} />
                            <Input required={true} onChange={handleChange} id={'nationality'} type={"text"} label={'Nationality'} placeholder={'Enter your nationality.'} />
                            <Input required={true} onChange={handleChange} id={'email'} type={"email"} label={'Email'} placeholder={'Enter your email.'} />
                            <Input required={true} onChange={handleChange} id={'mobileNoPrimary'} type={"text"} label={'Mobile Number 1'} placeholder={'Enter your mobile number.'} />
                            <Input onChange={handleChange} id={'mobileNoSecondary'} type={"text"} label={'Mobile Number 2'} placeholder={'Enter your alternate mobile number.'} />
                            <Input required={true} onChange={handleChange} id={'admissionYear'} type={"text"} label={'Admission Year'} placeholder={'Enter your admission Year.'} />
                            <Input required={true} onChange={handleChange} id={'grade'} type={"text"} label={'Grade'} placeholder={'Enter your grade.'} />
                        </div>
                    </div>
                    <div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Father's Information:</h1>
                        <div className='grid grid-cols-3 gap-6 w-full '>
                            <Input required={true} onChange={handleChange} id={'father_name'} type={"text"} label={'Father Name'} placeholder={`Enter your father's name.`} />
                            <Input onChange={handleChange} id={'father_phone_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your father's number.`} />
                            <Input onChange={handleChange} id={'father_email'} type={"email"} label={'Email'} placeholder={`Enter your father's email.`} />
                            <Input onChange={handleChange} id={'father_occupation'} type={"text"} label={`Father's Occupation`} placeholder={`Enter your father's occupation.`} />
                        </div>
                    </div>
                    <div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Mother's Information:</h1>
                        <div className='grid grid-cols-3 gap-6 w-full '>
                            <Input required={true} onChange={handleChange} id={'mother_name'} type={"text"} label={'Mother Name'} placeholder={`Enter your mother's name.`} />
                            <Input onChange={handleChange} id={'mother_phone_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your mother's number.`} />
                            <Input onChange={handleChange} id={'mother_email'} type={"email"} label={'Email'} placeholder={`Enter your mother's email.`} />
                            <Input onChange={handleChange} id={'mother_occupation'} type={"text"} label={`Mother's Occupation`} placeholder={`Enter your mother's occupation.`} />
                        </div>
                    </div>
                    <div className='border w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-2xl pb-2 mb-2'>Guardian's Information:</h1>
                        <div className='grid grid-cols-3 gap-6 w-full '>
                            <Input onChange={handleChange} id={'guardian_name'} type={"text"} label={'Guardian Name'} placeholder={`Enter your guardian's name.`} />
                            <Input onChange={handleChange} id={'guardian_phone_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your guardian's number.`} />
                            <Input onChange={handleChange} id={'guardian_email'} type={"email"} label={'Email'} placeholder={`Enter your guardian's email.`} />
                            <Input onChange={handleChange} id={'guardian_occupation'} type={"text"} label={`Guardian's Occupation`} placeholder={`Enter your guardian's occupation.`} />
                        </div>
                    </div>
                    <button className='bg-darkPurple rounded-md text-sm font-bold text-white w-auto px-5 py-3 mt-4 hover:bg-lightPurple duration-300' type='submit'>Submit</button>
                </form>
            </section>
        </>
    )
}

export default AdmissionPage