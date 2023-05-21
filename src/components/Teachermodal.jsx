import React, { useEffect, useState } from 'react'
import Input from './Input';
import axios from 'axios';
import Button from '../components/Button'
import TeacherformInitialState from '../InitialStates/Teacherform';
const TeacherModal = ({ setModal }) => {
    const [formState, setFormState] = useState(TeacherformInitialState);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }
    const addTeacher = (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(e)
        alert(formState.firstname)
        if (formState.firstname && formState.lastname && formState.email && formState.username && formState.password && formState.phoneNumber && formState.salaryType) {
            axios(`${process.env.REACT_APP_BASE_URL}/teacher/create`, {
                method: 'POST',
                data: formState
            })
                .then((res) => {
                    if (res.data.error) {
                        setMessage(res.data.message)
                        alert(res.data.message)
                    } else {
                        setMessage(res.data.message)
                        setLoading(false)
                        console.log(res.data);
                        setFormState(TeacherformInitialState);
                    }
                })
                .catch((err) => {
                    setLoading(false)
                    console.log(err)
                })
        } else {
            alert('Form incompletely filled')
        }

    }
    return (
        <>
            <div id="updateProductModal" tabindex="-1" aria-hidden="true" class="backdrop-blur-sm flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div class="relative p-4 bg-white rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
                        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
                            <h3 class="text-lg font-semibold dark:text-lightPurple">
                                Add Teachers
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-lightPurple hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkPurple dark:hover:text-white" data-modal-toggle="updateProductModal"
                                onClick={() => {
                                    setModal(false)
                                }}
                            >
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#" onSubmit={addTeacher}>
                            <div class="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.firstname} id="firstname" type={"text"} label={'First Name'} placeholder={'Enter your first name.'} />
                                </div>
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.lastname} type="text" id="lastname" label={'Last Name'} placeholder={'Enter your last name.'} />
                                </div>
                            </div>
                            <div class="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.email} type="email" id="email" label={'Email'} placeholder={'Enter your email'} />
                                </div>
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.phoneNumber} type="text" id="phoneNumber" label={'Phone Number'} placeholder="Phone Number" />
                                </div>
                            </div>
                            <div class="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.username} type="text" id="username" label={'Username'} placeholder="Username" />
                                </div>
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.password} type="password" id="password" label={'Password'} placeholder="Password" />
                                </div>
                            </div>
                            <div class="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.subject} type="text" id="subject" label={'Subject'} placeholder="Subject" />
                                </div>
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.salaryType} type="text" id="salaryType" label={'Salary Type'} placeholder="Salarytype" />
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <Button type='submit' text='Submit' className={'w-max px-10 mt-4 min-w-[150px]'} loading={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}
export default TeacherModal;