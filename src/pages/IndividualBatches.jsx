import { GrSearch } from 'react-icons/gr'
import Input from '../components/Input'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { UseBatchesContext } from '../context/Batches'
import IndividualBatchModal from '../Modals/IndividualBatchModal'
import { UseChapterAllocationContext } from '../context/ChapterAllocation'
import Alert from '../components/Alert'
import axios from 'axios'
import extractToken from '../Utils/ExtractToken'
import moment from 'moment'

const IndividualBatches = () => {
    const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined });
    const { individualChapterAllocation } = UseChapterAllocationContext()
    const [individualBatches, setIndividualBatches] = useState([])
    const [individualAttendance, setIndividualAttendance] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [startDate, setStartDate] = useState(1)
    const [endDate, setEndDate] = useState(Date.now())
    const [message, setMessage] = useState("")


    useEffect(() => {
        if (endDate) {
            axios(`${process.env.REACT_APP_BASE_URL}/individual-attendance/range?s=${startDate}&e=${endDate}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res.data.error) {
                        setMessage(res.data.message)
                    } else {
                        setIndividualAttendance(res.data.attendance)
                    }
                })
                .catch((err) => {
                    setMessage(err.message)
                })
            axios(`${process.env.REACT_APP_BASE_URL}/individual-batch/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${extractToken()?.token}`
                }
            })
                .then((res) => {
                    if (res.data.error) {
                        setMessage(res.data.message)
                    } else {
                        setIndividualBatches(res.data.batches)
                        setSearchResults(res.data.batches);
                    }
                })
                .catch((err) => {
                    setMessage(err.message)
                })
        }
    }, [startDate, endDate])


    const handleSearch = (e) => {
        if (e.target.value.length == 0) {
            setSearchResults(individualBatches)
        } else {
            setSearchResults(individualBatches?.filter((data) => {
                return `${data.name} ${data.grade}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
            }))
        }
    }
    return (
        <>
            <Alert setMessage={setMessage} message={message} />
            <Navbar />
            <IndividualBatchModal setShowModal={setShowModal} showModal={showModal} setMessage={setMessage} />
            <section className='w-screen min-h-screen p-10 px-20 Nunito'>
                <div className='flex items-start justify-between'>
                    <div className='w-[60%] relative'>
                        <Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
                        <GrSearch className='text-lg font-bold absolute left-[95%] top-1/2 -translate-y-1/2' />
                    </div>
                    <div className='w-[25%] flex justify-center items-center gap-x-3'>
                        <Input onChange={(e) => { setStartDate(Number(moment([Number(e.target.value.split("-")[0]), Number(e.target.value.split("-")[1]) - 1, Number(e.target.value.split("-")[2])]).format("x"))) }} type={"date"} />
                        <Input onChange={(e) => { setEndDate(Number(moment([Number(e.target.value.split("-")[0]), Number(e.target.value.split("-")[1]) - 1, Number(e.target.value.split("-")[2])]).format("x"))) }} type={"date"} />
                    </div>
                    <div className='flex justify-between w-[10%]'>
                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="h-max block text-white bg-lightPurple hover:bg-darkPurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-darkPurple dark:hover:bg-lightPurple dark:focus:ring-lightPurple" type="button" onClick={() => {
                            setShowModal({ show: true, update: false, data: undefined })
                        }}>
                            Add Batch
                        </button>
                    </div>
                </div>
                <div className="mx-auto mt-4">
                    <div className="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-sm uppercase bg-darkPurple text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-5">Batch Name</th>
                                        <th scope="col" className="px-6 py-5">Academic Year</th>
                                        <th scope="col" className="px-6 py-5">Hours</th>
                                        <th scope="col" className="px-6 py-5">Branch Name</th>
                                        <th scope="col" className="px-6 py-5">Students Fees</th>
                                        <th scope="col" className="px-6 py-5">Teacher Exp.</th>
                                    </tr>
                                </thead>
                                <tbody key={startDate} className='text-gray-700 mt-5'>
                                    {
                                        startDate && searchResults?.map((batch) => {
                                            const attendances = individualAttendance?.map((attendance) => {
                                                if (attendance?.individualBatch?._id === batch._id && attendance.approved) {
                                                    return Number(attendance?.hours) * Number(attendance.chapter_allocation.rate)
                                                } else {
                                                    return 0
                                                }
                                            })
                                            // const chapterAllocations = individualChapterAllocation?.map((chapterAllocation) => {
                                            //     if (chapterAllocation?.individualBatch?._id === batch._id) {
                                            //         return Number(chapterAllocation?.rate)
                                            //     } else {
                                            //         return 0
                                            //     }
                                            // })
                                            function add(accumulator, a) {
                                                return accumulator + a;
                                            }
                                            const sum = attendances.reduce(add, 0);
                                            return (
                                                <tr key={batch?._id} onClick={() => {
                                                    setShowModal({ show: true, update: true, data: batch })
                                                }} className="border-b border-darkPurple">
                                                    <td className="px-6 py-4">{batch?.name}</td>
                                                    <td className="px-6 py-4">{batch?.academicYear}</td>
                                                    <td className="px-6 py-4">{batch?.hours}</td>
                                                    <td className="hover:underline underline-offset-2 cursor-pointer px-6 py-4">{batch?.branch?.name}</td>
                                                    <td className="hover:underline underline-offset-2 cursor-pointer px-6 py-4">{batch?.amountPerStudent * batch?.students?.length}</td>
                                                    <td className="hover:underline underline-offset-2 cursor-pointer px-6 py-4">{sum}</td>
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
export default IndividualBatches