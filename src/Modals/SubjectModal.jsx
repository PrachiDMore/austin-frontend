import Navbar from "../components/Navbar";
import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import SubjectForm from "../InitialStates/SubjectForm"
import { UseSubjectContext } from "../context/Subjects";
import updateElementsInArray from "../Utils/UpdateUniqueElemetnsInArray";
import addElementInArray from "../Utils/AddUniqueElementsInArray";
import axios from "axios";
import extractToken from "../Utils/ExtractToken";


const SubjectModal = ({ setShowModal, showModal, setMessage }) => {
    const { subjects, setSubjects, } = UseSubjectContext();
    const [formState, setFormState] = useState(SubjectForm);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showModal.update) {
            setFormState(showModal.data);
        } else {
            setFormState(SubjectForm)
        }
    }, [showModal]);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (showModal.update) {
            if (formState.name && formState.grade) {
                axios(`${process.env.REACT_APP_BASE_URL}/subject/${showModal?.data?._id}`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${extractToken()?.token}`
                    },
                    data: formState
                })
                    .then((res) => {
                        if (res.data.error) {
                            setMessage(res.data.message)
                            setShowModal({ update: false, show: false, data: undefined })
                        } else {
                            setLoading(false)
                            setMessage(res.data.message)
                            setSubjects(updateElementsInArray(subjects, res.data.subject, showModal.data))
                            setShowModal({ update: false, show: false, data: undefined })
                            setFormState(SubjectForm);
                        }
                    })
                    .catch((err) => {
                        setMessage(err.message)
                        setLoading(false)
                    })
            } else {
                setMessage('Form incompletely filled')
            }
        } else {
            setLoading(true)
            if (formState.name && formState.grade) {
                axios(`${process.env.REACT_APP_BASE_URL}/subject/create`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${extractToken()?.token}`
                    },
                    data: formState
                })
                    .then((res) => {
                        if (res.data.error) {
                            setMessage(res.data.message)
                            setShowModal({ update: false, show: false, id: undefined })

                        } else {
                            setLoading(false)
                            setMessage(res.data.message)
                            setShowModal({ update: false, show: false, id: undefined })
                            setSubjects(addElementInArray(subjects, res.data.subject))
                            setFormState(SubjectForm);
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                        setMessage(err.message)
                    })
            } else {
                setMessage('Form incompletely filled')
            }
        }
    }

    return (
        <>
            <Navbar />
            <div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
                <div className="relative p-4 w-[70vw] h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
                            <h3 className="text-lg font-semibold dark:text-lightPurple">
                                {showModal.update ? "Update Subject" : "Add Subject"}
                            </h3>
                            <button type="button" className="duration-300 text-gray-400 bg-transparent hover:bg-lightPurple hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkPurple dark:hover:text-white" data-modal-toggle="updateProductModal"
                                onClick={() => {
                                    setShowModal({ show: false, update: false, data: undefined })
                                }}
                            >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.name} id="name" type={"text"} label={'Name'} placeholder={'Enter Chapter Name.'} />
                                </div>
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.grade} type="text" id="grade" label={'Grade'} placeholder={'Enter Grade'} />
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
export default SubjectModal;