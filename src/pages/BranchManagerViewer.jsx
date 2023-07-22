import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'
import { FiEdit3 } from 'react-icons/fi'
import { UseTeacherContext } from '../context/Teachers'
import BranchManagerModal from '../Modals/BranchManagerModal'
import { UseBranchManagerContext } from '../context/BranchManager'
import { UseBranchManagerViewerContext } from '../context/BranchManagerViewer'
import BranchManagerViewerModal from '../Modals/BranchManagerViewerModal'
import Alert from '../components/Alert'


const BranchManagerViewer = () => {
    const { BranchManagerViewers } = UseBranchManagerViewerContext()
    const [searchBranchManager, setSearchBranchManagers] = useState([]);
    const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined })
    const [message, setMessage] = useState("")

    useEffect(() => {
        setSearchBranchManagers(BranchManagerViewers)
    }, [BranchManagerViewers])

    const handleSearch = (e) => {
        if (e.target.value?.length == 0) {
            setSearchBranchManagers(BranchManagerViewers)
        } else {
            setSearchBranchManagers(BranchManagerViewers.filter((data) => {
                return `${data.firstname} ${data.lastname}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
            }))
        }
    }
    return (
        <>
            <Alert setMessage={setMessage} message={message} />
            <Navbar />
            <BranchManagerViewerModal setShowModal={setShowModal} showModal={showModal} setMessage={setMessage} />
            <section className='w-screen min-h-screen p-10 px-20 Nunito'>
                <div className='flex'>
                    <div className='w-[85%]'>
                        <Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
                        <GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
                    </div>
                    <div className='ml-[10px] w-[15%] min-w-[15%]'>
                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="w-full block text-white bg-lightPurple hover:bg-darkPurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-darkPurple dark:hover:bg-lightPurple dark:focus:ring-lightPurple" type="button" onClick={() => {
                            setShowModal({ show: true, update: false, data: undefined })
                        }}>
                            Add Branch Viewer
                        </button>
                    </div>
                </div>

                <div className="mx-auto">
                    <div className="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-sm uppercase bg-darkPurple text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-5">Name</th>
                                        <th scope="col" className="px-6 py-5">Email</th>
                                        <th scope="col" className="px-6 py-5">Phone Number</th>
                                        <th scope="col" className="px-6 py-5">Username</th>
                                        <th scope="col" className="px-6 py-5">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-700 mt-5'>
                                    {
                                        searchBranchManager?.map((data) => {
                                            return <tr key={data?._id} className="border-b border-darkPurple">
                                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{data?.firstname} {data?.lastname}</th>
                                                <td className="px-6 py-4">{data?.email}</td>
                                                <td className="px-6 py-4">{data?.phonenumber}</td>
                                                <td className="px-6 py-4">{data?.username}</td>
                                                <td className="px-6 py-4 capitalize flex gap-3">
                                                    <span onClick={() => {
                                                        setShowModal({ show: true, update: true, data: data })
                                                    }} className='text-white bg-darkPurple h-8 w-8 flex items-center justify-center cursor-pointer rounded-lg'><FiEdit3 /></span>
                                                    {/* <span><FiTrash/></span> */}
                                                </td>
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
export default BranchManagerViewer;