import { UseCourseContext } from "../context/Courses"
import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CourseModal from "../Modals/CourseModal";

const ViewCourses = ({ editable = true }) => {
    const { courses, setCourses } = UseCourseContext();
    const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined })
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setSearchResults(courses);
    }, [courses])

    const handleSearch = (e) => {
        if (e.target.value.length == 0) {
            setSearchResults(courses)
        } else {
            setSearchResults(courses?.filter((data) => {
                return `${data.name} ${data.grade}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
            }))
        }
    }
    return (
        <>
            <Navbar />
            <CourseModal key={Date.now().toString()} showModal={showModal} setShowModal={setShowModal} />
            <section className='w-screen min-h-screen p-10 px-20 Nunito'>
                <div className='flex'>
                    <div className='w-[90%]'>
                        <Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
                        <GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
                    </div>
                    {editable && <div className='ml-[10px]'>
                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-lightPurple hover:bg-darkPurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-darkPurple dark:hover:bg-lightPurple dark:focus:ring-lightPurple" type="button" onClick={() => {
                            setShowModal({ show: true, update: false, data: undefined })
                        }}>
                            Add Courses
                        </button>
                    </div>}
                </div>
                <div className="mx-auto">
                    <div className="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-sm uppercase bg-darkPurple text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-5">Courses Name</th>
                                        <th scope="col" className="px-6 py-5">Grade</th>
                                        <th scope="col" className="px-6 py-5">ID</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-700 mt-5'>
                                    {
                                        searchResults?.map((course) => {
                                            return (
                                                <tr key={course?._id} className="border-b border-darkPurple">
                                                    <td className="px-6 py-4">{course?.name}</td>
                                                    <td className="px-6 py-4">{course?.grade}</td>
                                                    <td
                                                        onClick={() => {
                                                            if (editable) {
                                                                setShowModal({ show: true, update: true, data: course })
                                                            }
                                                        }}
                                                        className="px-6 py-4">{course?._id}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ViewCourses