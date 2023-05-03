import React from 'react'
import Input from '../components/Input'
import Navbar from '../components/Navbar'

const AdmissionPage = () => {
    return (
        <>
            <section className='w-screen min-h-screen Nunito'>
                <Navbar />
                <div className='w-full p-10 flex flex-col items-center'>
                    <div className='text-3xl font-bold p-4 '>Admission Form</div>
                    <div className='w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-xl pb-2'>Personal Information:</h1>
                        <div className='grid grid-cols-3 gap-6 w-full '>
                            <Input id={'fname'} type={"text"} label={'First Name'} placeholder={'Enter your first name.'} />
                            <Input id={'mname'} type={"text"} label={'Middle Name'} placeholder={'Enter your middle name.'} />
                            <Input id={'lname'} type={"text"} label={'Last Name'} placeholder={'Enter your last name.'} />
                            <Input id={'photoURL'} type={"file"} label={'Profile Image'} />
                            <Input id={'gender'} type={"text"} label={'Gender'} placeholder={'Enter your last name.'} />
                            <Input id={'dob'} type={"date"} label={'Date of Birth'} placeholder={'Enter your last name.'} />
                            <Input id={'address'} type={"text"} label={'Address'} placeholder={'Enter your address.'} />
                            <Input id={'landmark'} type={"text"} label={'Landmark'} placeholder={'Enter your landmark (optional).'} />
                            <Input id={'city'} type={"text"} label={'City'} placeholder={'Enter your city.'} />
                            <Input id={'state'} type={"text"} label={'State'} placeholder={'Enter your state.'} />
                            <Input id={'pincode'} type={"text"} label={'Pincode'} placeholder={'Enter your pincode.'} />
                            <Input id={'nationality'} type={"text"} label={'Nationality'} placeholder={'Enter your nationality.'} />
                            <Input id={'email'} type={"email"} label={'Email'} placeholder={'Enter your email.'} />
                            <Input id={'mobileno1'} type={"text"} label={'Mobile Number 1'} placeholder={'Enter your mobile number.'} />
                            <Input id={'mobileno2'} type={"text"} label={'Mobile Number 2'} placeholder={'Enter your alternate mobile number.'} />
                            <Input id={'admission_year'} type={"text"} label={'Admission Year'} placeholder={'Enter your admission Year.'} />
                            <Input id={'grade'} type={"text"} label={'Grade'} placeholder={'Enter your grade.'} />
                            <Input id={'course'} type={"text"} label={'Course'} placeholder={'Enter your course.'} />

                        </div>
                    </div>
                    <div className='w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-xl pb-2'>Father's Information:</h1>
                        <div className='grid grid-cols-3 gap-6 w-full '>
                            <Input id={'father_name'} type={"text"} label={'Father Name'} placeholder={`Enter your father's name.`} />
                            <Input id={'father_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your father's number.`} />
                            <Input id={'father_email'} type={"email"} label={'Email'} placeholder={`Enter your father's email.`} />
                            <Input id={'father_occupation'} type={"text"} label={`Father's Occupation`} placeholder={`Enter your father's occupation.`} />
                        </div>
                    </div>
                    <div className='w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-xl pb-2'>Mother's Information:</h1>
                        <div className='grid grid-cols-3 gap-6 w-full '>
                            <Input id={'mother_name'} type={"text"} label={'Mother Name'} placeholder={`Enter your mother's name.`} />
                            <Input id={'mother_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your mother's number.`} />
                            <Input id={'mother_email'} type={"email"} label={'Email'} placeholder={`Enter your mother's email.`} />
                            <Input id={'mother_occupation'} type={"text"} label={`Mother's Occupation`} placeholder={`Enter your mother's occupation.`} />
                        </div>
                    </div>
                    <div className='w-full my-3 rounded-lg shadow-md shadow-purpleShadow p-7'>
                        <h1 className='font-semibold text-darkPurple text-xl pb-2'>Guardian's Information:</h1>
                        <div className='grid grid-cols-3 gap-6 w-full '>
                            <Input id={'guardian_name'} type={"text"} label={'Guardian Name'} placeholder={`Enter your guardian's name.`} />
                            <Input id={'guardian_number'} type={"text"} label={'Mobile Number'} placeholder={`Enter your guardian's number.`} />
                            <Input id={'guardian_email'} type={"email"} label={'Email'} placeholder={`Enter your guardian's email.`} />
                            <Input id={'guardian_occupation'} type={"text"} label={`Guardian's Occupation`} placeholder={`Enter your guardian's occupation.`} />
                        </div>
                    </div>
                    <button className='bg-darkPurple rounded-md text-sm font-bold text-white w-auto px-5 py-3 mt-4 hover:bg-lightPurple duration-300' type='submit'>Submit</button>
                </div>
            </section>
        </>
    )
}

export default AdmissionPage