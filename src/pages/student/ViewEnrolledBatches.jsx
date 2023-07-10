import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'
import { GrSearch } from 'react-icons/gr'
import { UseBatchesContext } from '../../context/Batches'

const ViewEnrolledBatches = () => {
    const { batches } = UseBatchesContext()
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setSearchResults(batches);
    }, [batches])

    const handleSearch = (e) => {
        if (e.target.value.length == 0) {
            setSearchResults(batches)
        } else {
            setSearchResults(batches?.filter((data) => {
                return `${data?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.branch?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.course?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
            }))
        }
    }
    return (
        <>
            <Navbar />
            <section className='w-screen min-h-screen p-10 px-20 Nunito'>
                <div className='flex'>
                    <div className='w-full'>
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
                                        searchResults?.map((batch) => {
                                            return (
                                                <tr key={batch?._id} onClick={() => {
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

export default ViewEnrolledBatches
