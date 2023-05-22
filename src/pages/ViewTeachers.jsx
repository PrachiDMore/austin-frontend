import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'
import axios from 'axios'
import TeacherModal from '../components/TeacherModal'
import { UseTeacherContext } from '../context/Teachers'


const ViewTeachers = () => {
    const {teachers, setTeachers } = UseTeacherContext()
    const [searchteachers, setSearchteachers] = useState([]);
    const [showModal, setShowModal] = useState({show: false, update: false, data: undefined})

    useEffect(()=>{
        setSearchteachers(teachers)
    },[teachers])

    const handleSearch = (e) => {
        if (e.target.value.length == 0) {
            setSearchteachers(teachers)
        } else {
            setSearchteachers(teachers.filter((data) => {
                return `${data.firstname} ${data.lastname}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || data?.gender?.toLowerCase()?.includes(e.target.value.toLowerCase()) || data?.email?.toLowerCase()?.includes(e.target.value.toLowerCase()) || data?.mobileNoPrimary?.toLowerCase()?.includes(e.target.value.toLowerCase()) || data?.grade?.toLowerCase()?.includes(e.target.value.toLowerCase())
            }))
        }
    }
    return (
        <>
            <Navbar />

            <TeacherModal setShowModal={setShowModal} showModal={showModal}/>
            <section className='w-screen min-h-screen p-10 px-20 Nunito'>
                <div className='flex'>
                    <div className='w-[90%]'>
                        <Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
                        <GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />

                    </div>
                    <div className='ml-[10px]'>
                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white bg-lightPurple hover:bg-darkPurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-darkPurple dark:hover:bg-lightPurple dark:focus:ring-lightPurple" type="button" onClick={() => {
                            setShowModal({show: true, update: false, data: undefined})
                        }}>
                            Add Teacher
                        </button>
                    </div>
                </div>


                <div class="mx-auto">
                    <div class="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-sm uppercase bg-darkPurple text-white">
                                    <tr>
                                        <th scope="col" class="px-6 py-5">Name</th>
                                        <th scope="col" class="px-6 py-5">Email</th>
                                        <th scope="col" class="px-6 py-5">Phone Number</th>
                                        <th scope="col" class="px-6 py-5">Salary Type</th>
                                        <th scope="col" class="px-6 py-5">Disabled</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-700 mt-5'>
                                    {
                                        searchteachers?.map((data) => {
                                            console.log(data)
                                            return <tr onClick={() => {
                                                setShowModal({show: true, update: true, data: data})
                                            }} key={data?._id} class="border-b border-darkPurple">
                                                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{data?.fullname}</th>
                                                <td class="px-6 py-4">{data?.email}</td>
                                                <td class="px-6 py-4">{data?.phoneNumber}</td>
                                                <td class="px-6 py-4 capitalize">{data?.salaryType}</td>
                                                <td class="px-6 py-4 capitalize">{data?.isDisabled ? "Disabled" : "Enabled"}</td>
                                            </tr>
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
export default ViewTeachers;