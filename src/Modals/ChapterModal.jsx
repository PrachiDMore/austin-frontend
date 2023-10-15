import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import ChapterForm from '../InitialStates/ChapterFrom';
import { UseChapterContext } from '../context/Chapter';
import { UseSubjectContext } from '../context/Subjects';
import updateElementsInArray from '../Utils/UpdateUniqueElemetnsInArray';
import addElementInArray from '../Utils/AddUniqueElementsInArray';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SearchableSelect from '../components/SearchableSelect';
import extractToken from "../Utils/ExtractToken";

const ChatperModal = ({ setShowModal, showModal, setMessage }) => {
    const { chapters, setChapters } = UseChapterContext();
    const { subjectOptions } = UseSubjectContext()
    const [formState, setFormState] = useState(ChapterForm);
    const [subjectValue, setSubjectValue] = useState();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }
    const handleSubjects = (e) => {
        setSubjectValue(e);
    }


    useEffect(() => {
        if (showModal.update) {
            setFormState(showModal.data);
            setSubjectValue({ label: `${showModal?.data?.subjectID?.name} (${showModal?.data?.subjectID?.grade})`, value: showModal?.data?.subjectID?._id })
        } else {
            setSubjectValue()
            setFormState(ChapterForm)
        }
    }, [showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (showModal.update) {
            if (formState.name && formState.grade && formState.hours) {
                axios(`${process.env.REACT_APP_BASE_URL}/chapter/${showModal?.data?._id}`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${extractToken()?.token}`
                    },
                    data: { ...formState, subjectID: subjectValue?.value }
                })
                    .then((res) => {
                        if (res.data.error) {
                            setMessage(res.data.message)
                            setShowModal({ update: false, show: false, data: undefined })
                            setSubjectValue()
                        } else {
                            setLoading(false)
                            setMessage(res.data.message)
                            setChapters(updateElementsInArray(chapters, res.data.chapter, showModal.data))
                            setShowModal({ update: false, show: false, data: undefined })
                            setSubjectValue()
                            setFormState(ChapterForm);
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
            if (formState.name && formState.grade && formState.hours) {
                axios(`${process.env.REACT_APP_BASE_URL}/chapter/create`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${extractToken()?.token}`
                    },
                    data: { ...formState, subjectID: subjectValue?.value }
                })
                    .then((res) => {
                        if (res.data.error) {
                            setLoading(false)
                            setMessage(res.data.message)
                            setShowModal({ update: false, show: false, id: undefined })
                            setSubjectValue()
                        } else {
                            setMessage(res.data.message)
                            setLoading(false)
                            setShowModal({ update: false, show: false, id: undefined })
                            setChapters(addElementInArray(chapters, res.data.chapter))
                            setFormState(ChapterForm);
                            setSubjectValue()
                        }
                    })
                    .catch((err) => {
                        setMessage(err.message)
                        setLoading(false)
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
                                {showModal.update ? "Update Chapter" : "Add Chapter"}
                            </h3>
                            <button type="button" className="duration-300 text-gray-400 bg-transparent hover:bg-lightPurple hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkPurple dark:hover:text-white" data-modal-toggle="updateProductModal"
                                onClick={() => {
                                    setShowModal({ show: false, update: false, data: undefined })
                                    setSubjectValue()
                                }}
                            >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                    <Input onChange={handleChange} required={true} value={formState.name} id="name" type={"text"} label={'Name'} placeholder={'Enter Chapter Name.'} />
                                    <SearchableSelect label={"Subject"} value={subjectValue} onChange={handleSubjects} options={subjectOptions} />
                            </div>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.grade} type="text" id="grade" label={'Grade'} placeholder={'Enter Grade'} />
                                </div>
                                <div>
                                    <Input onChange={handleChange} required={true} value={formState.hours} type="text" id="hours" label={'Hours'} placeholder="Enter hours required" />
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
export default ChatperModal