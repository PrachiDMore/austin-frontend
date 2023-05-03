import React from 'react'
import Input from '../components/Input'

const AdmissionPage = () => {
  return (
    <>
        <section className='w-screen min-h-screen flex flex-col items-center p-10 Nunito'>
            <div>
                <img className='w-56 h-auto' src="/assets/logo.jpg" alt="" />
            </div>
            <div className='text-3xl font-bold p-4 '>Admission Form</div>
            <div className='grid grid-cols-3 gap-6 w-full'>
                <Input id={'fname'} type={"text"} label={'First Name'} placeholder={'Enter your first name.'}/>
                <Input id={'mname'} type={"text"} label={'Middle Name'} placeholder={'Enter your middle name.'}/>
                <Input id={'lname'} type={"text"} label={'Last Name'} placeholder={'Enter your last name.'}/>
                <Input id={'photoURL'} type={"file"} label={'Profile Image'}/>
                <Input id={'gender'} type={"text"} label={'Gender'} placeholder={'Enter your last name.'}/>
                <Input id={'dob'} type={"date"} label={'Date of Birth'} placeholder={'Enter your last name.'}/>
                <Input id={'address'} type={"text"} label={'Address'} placeholder={'Enter your address.'}/>
                <Input id={'landmark'} type={"text"} label={'Landmark'} placeholder={'Enter your landmark (optional).'}/>
                <Input id={'city'} type={"text"} label={'City'} placeholder={'Enter your city.'}/>
                <Input id={'state'} type={"text"} label={'State'} placeholder={'Enter your state.'}/>
                <Input id={'pincode'} type={"text"} label={'Pincode'} placeholder={'Enter your pincode.'}/>
                <Input id={'nationality'} type={"text"} label={'Nationality'} placeholder={'Enter your nationality.'}/>
                <Input id={'email'} type={"email"} label={'Email'} placeholder={'Enter your email.'}/>
                <Input id={'mobileno1'} type={"text"} label={'Mobile Number 1'} placeholder={'Enter your mobile number.'}/>
                <Input id={'mobileno2'} type={"text"} label={'Mobile Number 2'} placeholder={'Enter your alternate mobile number.'}/>
                <Input id={'father_name'} type={"text"} label={'Father Name'} placeholder={'Enter your father name.'}/>
                <Input id={'father_number'} type={"text"} label={'Mobile Number'} placeholder={'Enter your father number.'}/>
                <Input id={'father_email'} type={"email"} label={'Email'} placeholder={'Enter your father email.'}/>
                <Input id={'mother_name'} type={"text"} label={'Mother Name'} placeholder={'Enter your mother name.'}/>
                <Input id={'mother_number'} type={"text"} label={'Mobile Number'} placeholder={'Enter your mother number.'}/>
                <Input id={'mother_email'} type={"email"} label={'Email'} placeholder={'Enter your mother email.'}/>
                <Input id={'father_occupation'} type={"text"} label={`Father's Occupation`} placeholder={`Enter your father's occupation.`}/>
                <Input id={'mother_occupation'} type={"text"} label={`Mother's Occupation`} placeholder={`Enter your mother's occupation.`}/>
            </div>
            <hr />
            <div className='grid grid-cols-3 gap-6 w-full'>
            <Input id={'guardian_name'} type={"text"} label={'Guardian Name'} placeholder={'Enter your guardian name.'}/>
                <Input id={'guardian_number'} type={"text"} label={'Mobile Number'} placeholder={'Enter your guardian number.'}/>
                <Input id={'guardian_email'} type={"email"} label={'Email'} placeholder={'Enter your guardian email.'}/>
                <Input id={'guardian_occupation'} type={"text"} label={`Guardian's Occupation`} placeholder={`Enter your guardian's occupation.`}/>
                <Input id={'admission_year'} type={"text"} label={'Admission Year'} placeholder={'Enter your admission Year.'}/>
                <Input id={'grade'} type={"text"} label={'Grade'} placeholder={'Enter your grade.'}/>
                <Input id={'course'} type={"text"} label={'Course'} placeholder={'Enter your course.'}/>
            </div>
        </section>
    </>
  )
}

export default AdmissionPage