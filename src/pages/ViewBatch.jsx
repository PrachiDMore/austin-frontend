import { GrSearch } from 'react-icons/gr'
import Input from '../components/Input'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import { UseBatchesContext } from '../context/Batches'
import BatchModal from '../Modals/BatchModal'
import Alert from '../components/Alert'

const ViewBatch = () => {
    const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined });
    const { batches } = UseBatchesContext()
    const [searchResults, setSearchResults] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        setSearchResults(batches);
    }, [batches])

    const handleSearch = (e) => {
        if (e.target.value.length == 0) {
            setSearchResults(batches)
        } else {
            setSearchResults(batches?.filter((data) => {
                return `${data.name} ${data.grade}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
            }))
        }
    }
    return (
        <>
            <Alert message={message} setMessage={setMessage} />
            <Navbar />
            <BatchModal setShowModal={setShowModal} showModal={showModal} setMessage={setMessage} />
            <section className='w-screen min-h-screen p-10 px-20 Nunito'>
                <div className='flex'>
                    <div className='w-[90%]'>
                        <Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
                        <GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
                    </div>
                    <div className='ml-[10px] flex justify-between w-[10%]'>
                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="h-max block text-white bg-lightPurple hover:bg-darkPurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-darkPurple dark:hover:bg-lightPurple dark:focus:ring-lightPurple" type="button" onClick={() => {
                            setShowModal({ show: true, update: false, data: undefined })
                        }}>
                            Add Batch
                        </button>
                    </div>
                </div>
                <div className="mx-auto">
                    <div className="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-sm uppercase bg-darkPurple text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-5">Batch Name</th>
                                        <th scope="col" className="px-6 py-5">Academic Year</th>
                                        <th scope="col" className="px-6 py-5">Type</th>
                                        <th scope="col" className="px-6 py-5">Branch Name</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-700 mt-5'>
                                    {
                                        searchResults?.map((batch) => {
                                            return (
                                                <tr key={batch?._id} onClick={() => {
                                                    setShowModal({ show: true, update: true, data: batch })
                                                }} className="border-b border-darkPurple">
                                                    <td className="px-6 py-4">{batch?.name}</td>
                                                    <td className="px-6 py-4">{batch?.academicYear}</td>
                                                    <td className="px-6 py-4">{batch?.typeOfBatch}</td>
                                                    <td className="hover:underline underline-offset-2 cursor-pointer px-6 py-4">{batch?.branch?.name}</td>
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
export default ViewBatch