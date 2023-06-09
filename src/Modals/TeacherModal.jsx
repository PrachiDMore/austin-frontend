import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import Select from '../components/Select';
import axios from 'axios';
import Button from '../components/Button'
import TeacherformInitialState from '../InitialStates/Teacherform';
import addElementInArray from '../Utils/AddUniqueElementsInArray';
import { UseTeacherContext } from '../context/Teachers';
import { UseSubjectContext } from '../context/Subjects';

import SelectSubject from 'react-select';
import updateElementsInArray from '../Utils/UpdateUniqueElemetnsInArray';
import SearchableSelect from '../components/SearchableSelect';

const TeacherModal = ({ setShowModal, showModal }) => {
    const { teachers, setTeachers } = UseTeacherContext()
    const { subjects, subjectOptions } = UseSubjectContext()
    const [formState, setFormState] = useState(TeacherformInitialState);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedSubjects, setSelectedSubjects] = useState([])
    const [subjectValue, setSubjectValue] = useState([])

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }

    const handleSubjects = (e) => {
        setSubjectValue(e);
        setSelectedSubjects(e.map((subject) => {
            return subject.value
        }))
    }

    useEffect(() => {
        if (showModal.update) {
            setSubjectValue(showModal?.data?.subject?.map((subject) => {
                return {
                    label: `${subject.name} (${subject.grade})`,
                    value: subject._id
                }
            }))
            setFormState(showModal.data);
        } else {
            setSubjectValue([])
            setFormState(TeacherformInitialState)
        }
    }, [showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (showModal.update) {
            if (formState.fullname  && formState.email && formState.username && formState.password && formState.phoneNumber && formState.salaryType) {
                axios(`${process.env.REACT_APP_BASE_URL}/teacher/${showModal?.data?._id}`, {
                    method: 'PATCH',
                    data: { ...formState, subject: selectedSubjects }
                })
                    .then((res) => {
                        if (res.data.error) {
                            console.log(res.data)
                            setMessage(res.data.message)
                            setShowModal({ update: false, show: false, data: undefined })
                            setSelectedSubjects([])
                        } else {
                            setMessage(res.data.message)
                            setLoading(false)
                            setTeachers(updateElementsInArray(teachers, res.data.teacher, showModal.data))
                            setShowModal({ update: false, show: false, data: undefined })
                            setSelectedSubjects([])
                            setFormState(TeacherformInitialState);
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
            } else {
                alert('Form incompletely filled')
            }
        } else {
            setLoading(true)
            if (formState.fullname && formState.email && formState.username && formState.password && formState.phoneNumber && formState.salaryType) {
                axios(`${process.env.REACT_APP_BASE_URL}/teacher/create`, {
                    method: 'POST',
                    data: { ...formState, subject: selectedSubjects }
                })
                    .then((res) => {
                        if (res.data.error) {
                            setMessage(res.data.message)
                            alert(res.data.message)
                            setShowModal({ update: false, show: false, id: undefined })
                            setSelectedSubjects([])

                        } else {
                            setMessage(res.data.message)
                            setLoading(false)
                            setShowModal({ update: false, show: false, id: undefined })
                            setSelectedSubjects([])
                            setTeachers(addElementInArray(teachers, res.data.teacher))
                            setFormState(TeacherformInitialState);
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
            } else {
                alert('Form incompletely filled')
            }

        }
    }
    return (
        <>
            <div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
                <div className="relative p-4 w-[70vw] h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
                            <h3 className="text-lg font-semibold dark:text-lightPurple">
                                {showModal.update ? "Update Teacher" : "Add Teacher"}
                            </h3>
                            <button type="button" className="duration-300 text-gray-400 bg-transparent hover:bg-lightPurple hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkPurple dark:hover:text-white" data-modal-toggle="updateProductModal"
                                onClick={() => {
                                    setShowModal({ show: false, update: false, data: undefined })
                                    setSelectedSubjects([])
                                }}
                            >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.fullname} id="fullname" type={"text"} label={'Full Name'} placeholder={'Enter your full name.'} />
                                </div>
                                <div>
                                    <SearchableSelect label={"Subjects"} value={subjectValue} onChange={handleSubjects} options={subjectOptions} isMulti={true} />
                                </div>
                            </div>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.email} type="email" id="email" label={'Email'} placeholder={'Enter your email'} />
                                </div>
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.phoneNumber} type="text" id="phoneNumber" label={'Phone Number'} placeholder="Phone Number" />
                                </div>
                            </div>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.username} type="text" id="username" label={'Username'} placeholder="Username" />
                                </div>
                                <div>
                                    <Input onChange={handleChange} required={false} value={formState.password} type="password" id="password" label={'Password'} placeholder="Password" />
                                </div>
                            </div>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <Select options={[{ label: "Disable", value: true }, { label: "Enable", value: false }]} onChange={handleChange} required={true} value={formState.isDisabled} id="isDisabled" label={'Disable Teacher'} placeholder="Disable Teacher" />
                                </div>
                                <div>
                                    <Select options={[{ label: "Monthly", value: "monthly" }, { label: "Hourly", value: "hourly" }]} onChange={handleChange} required={true} value={formState.salaryType} id="salaryType" label={'Salary Type'} placeholder="Salarytype" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 justify-center">
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