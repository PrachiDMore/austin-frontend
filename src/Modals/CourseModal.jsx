import React, { useState, useEffect } from 'react';
import Input from '../components/Input'
import Button from '../components/Button';
import { UseCourseContext } from '../context/Courses';
import { UseSubjectContext } from '../context/Subjects';
import CoursesForm from '../InitialStates/CoursesForm';
import axios from "axios";
import updateElementsInArray from '../Utils/UpdateUniqueElemetnsInArray';
import addElementInArray from '../Utils/AddUniqueElementsInArray';
import SelectSubject from 'react-select';
import { UseChapterContext } from '../context/Chapter';
import SearchableSelect from '../components/SearchableSelect';


const CourseModal = ({ setShowModal, showModal }) => {
    const { courses, setCourses } = UseCourseContext();
    const { subjects, subjectOptions } = UseSubjectContext()
    const [formState, setFormState] = useState(CoursesForm);
    const [subjectValue, setSubjectValue] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([])
    const [selectedSubject, setSelectedSubject] = useState()
    const [loading, setLoading] = useState(false);
    const { chapters } = UseChapterContext();
    const [displayChapters, setDisplayChapters] = useState([])

    useEffect(() => {
        if (showModal.update) {
            setSubjectValue(showModal?.data?.subjects?.map((subject) => {
                console.log({
                    ...subject,
                    label: `${subject.name} (${subject.grade})`,
                    value: subject._id
                })
                return {
                    ...subject,
                    label: `${subject.name} (${subject.grade})`,
                    value: subject._id
                }
            }))
            setFormState(showModal.data);
        } else {
            setFormState(CoursesForm)
        }
    }, [showModal]);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        })
    }

    useEffect(() => {
        if (selectedSubject) {
            const filteredChapters = chapters.filter((chapter) => {
                return chapter?.subjectID?._id === selectedSubject?._id
            })
            setDisplayChapters(filteredChapters)
        }
    }, [selectedSubject]);

    const handleSubjects = (e) => {
        setSubjectValue(e);
        setSelectedSubjects(e.map((subject) => {
            return subject.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (showModal.update) {
            if (formState.name && formState.grade) {
                axios(`${process.env.REACT_APP_BASE_URL}/course/${showModal?.data?._id}`, {
                    method: 'PATCH',
                    data: { ...formState, subjects: selectedSubjects }
                })
                    .then((res) => {
                        if (res.data.error) {
                            setShowModal({ update: false, show: false, data: undefined })
                        } else {
                            setLoading(false)
                            setCourses(updateElementsInArray(courses, res.data.course, showModal.data))
                            setShowModal({ update: false, show: false, data: undefined })
                            setFormState(CoursesForm);
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
            } else {
                alert('Form incompletely filled')
            }
            console.log(showModal?.data)
        } else {
            axios(`${process.env.REACT_APP_BASE_URL}/course/create`, {
                method: "POST",
                data: { ...formState, subjects: selectedSubjects }
            })
                .then((res) => {
                    console.log(res.data)
                    setShowModal({ show: false, update: false, data: undefined })
                    setSelectedSubject();
                    setSelectedSubjects([]);
                    setDisplayChapters([])
                    setCourses(addElementInArray(courses, res.data.course))
                    setFormState(CoursesForm)
                })
                .catch((err) => {
                    console.log(err)
                    setShowModal({ show: false, update: false, data: undefined })
                    setSelectedSubject();
                    setSelectedSubjects([]);
                    setDisplayChapters([])
                    setFormState(CoursesForm)
                })
        }
    }

    return (
        <div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
            <div className="relative p-4 w-[90vw] h-[90vh]">
                <div className="h-full relative p-4 bg-white rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
                        <h3 className="text-lg font-semibold dark:text-lightPurple">
                            {showModal.update ? "Update Course" : "Add Course"}
                        </h3>
                        <button type="button" className="duration-300 text-gray-400 bg-transparent hover:bg-lightPurple hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkPurple dark:hover:text-white" data-modal-toggle="updateProductModal"
                            onClick={() => {
                                setShowModal({ show: false, update: false, data: undefined })
                                setShowModal({ show: false, update: false, data: undefined })
                                setSelectedSubject();
                                setSelectedSubjects([]);
                                setDisplayChapters([])
                                setFormState(CoursesForm)
                            }}
                        >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form action="#" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <Input onChange={handleChange} required={true} value={formState.name} id="name" type={"text"} label={'Name'} placeholder={'Enter Course Name.'} />
                            <Input onChange={handleChange} required={true} value={formState.grade} type="text" id="grade" label={'Grade'} placeholder={'Enter Grade'} />
                            {/* <Input onChange={handleChange} required={true} value={formState.hours} type="text" id="hours" label={'Hours'} placeholder="Enter hours required" /> */}
                        </div>
                        <div className='grid grid-cols-2 gap-x-6 gap-y-3'>
                            <SearchableSelect value={subjectValue} label={"Subjects"} onChange={handleSubjects} options={subjectOptions} isMulti={true} />
                            <SearchableSelect label={"Choose Subject"} onChange={(e) => { setSelectedSubject(e) }} value={selectedSubject} options={subjectValue} isMulti={false} />

                            <table className="rounded-lg w-full text-left text-gray-500 dark:text-gray-400 h-max">
                                <thead className="rounded-lg overflow-hidden text-sm uppercase bg-darkPurple text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-5">Subject Name</th>
                                        <th scope="col" className="px-6 py-5">Subject ID</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-700 mt-5'>
                                    {
                                        subjectValue?.map((Subject) => {
                                            return (
                                                <tr key={Subject?._id}
                                                    className="border-b border-darkPurple">
                                                    <td className="px-6 py-4">{Subject?.name}</td>
                                                    <td className="px-6 py-4">{Subject?._id}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <table className="w-full text-left text-gray-500 dark:text-gray-400 h-max">
                                <thead className="text-sm uppercase bg-darkPurple text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-5">Chapter Name</th>
                                        <th scope="col" className="px-6 py-5">Hours</th>
                                        <th scope="col" className="px-6 py-5">Chapter ID</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-700 mt-5'>
                                    {
                                        displayChapters?.map((chapter) => {
                                            return (
                                                <tr key={chapter?._id} className="border-b border-darkPurple h-max">
                                                    <td className="px-6 py-4">{chapter?.name}</td>
                                                    <td className="px-6 py-4">{chapter?.hours}</td>
                                                    <td className="px-6 py-4">{chapter?._id}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center space-x-4 justify-center">
                            <Button type='submit' text='Submit' className={'w-max px-10 mt-4 min-w-[150px]'} loading={loading} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CourseModal