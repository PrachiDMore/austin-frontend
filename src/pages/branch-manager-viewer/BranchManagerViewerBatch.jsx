import { GrSearch } from 'react-icons/gr'
import Input from '../../components/Input'
import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import { UseBatchesContext } from '../../context/Batches'
import BatchModal from '../../Modals/BatchModal'
import { UseAuthContext } from '../../context/Authentication'

const BranchManagerViewerBatch = () => {
    const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined });
    const { batches } = UseBatchesContext()
    const { user } = UseAuthContext();
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        console.log(batches)
        setSearchResults(batches);
    }, [batches])

    const handleSearch = (e) => {
        if (e.target.value.length == 0) {
            setSearchResults(batches)
        } else {
            setSearchResults(batches?.filter((data) => {
                return `${data.academicYear}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.branch?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.course?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
            }))
        }
    }

    return (
        <>
            <Navbar />
            {/* <BatchModal setShowModal={setShowModal} showModal={showModal} /> */}
            <section className='w-screen min-h-screen p-10 px-20 Nunito'>
                <div className='flex'>
                    <div className='w-[90%]'>
                        <Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
                        <GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
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
                                        searchResults?.filter((data) => {
                                            console.log(data, 123)
                                            return data?.branch?.viewer === user?._id
                                        }).map((batch) => {
                                            return (
                                                <tr key={batch?._id} className="border-b border-darkPurple">
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
export default BranchManagerViewerBatch