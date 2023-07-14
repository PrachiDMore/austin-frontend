import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import { UseChapterAllocationContext } from '../../context/ChapterAllocation';
import AssignTeacher from '../../Modals/AssignTeacher';
import Input from '../../components/Input';
import { GrSearch } from 'react-icons/gr';
import { UseBatchesContext } from '../../context/Batches';
import { UseAuthContext } from '../../context/Authentication';

const BranchManagerViewerChapterAllocation = () => {
	const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined });
	const { chapterAllocations } = UseChapterAllocationContext()
	const { user } = UseAuthContext()
	const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setSearchResults(chapterAllocations);
    }, [chapterAllocations])

    const handleSearch = (e) => {
        if (e.target.value.length == 0) {
            setSearchResults(chapterAllocations)
        } else {
            setSearchResults(chapterAllocations?.filter((data) => {
                return `${data?.subject?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.batch?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.chapter?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.teacher?.fullname}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
            }))
        }
    }

	return (
		<>
			<Navbar />
			{/* <AssignTeacher type={""} setShowModal={setShowModal} showModal={showModal} /> */}
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
										<th scope="col" className="px-6 py-5">Chapter Name</th>
										<th scope="col" className="px-6 py-5">Teacher Name</th>
										<th scope="col" className="px-6 py-5">Subject</th>
										<th scope="col" className="px-6 py-5">Rate</th>
										<th scope="col" className="px-6 py-5">Hours Completed / Hours</th>
									</tr>
								</thead>
								<tbody className='text-gray-700 mt-5'>
									{
										searchResults?.map((chapterAllocation) => {
											if (chapterAllocation?.batch?.branch?.viewer === user?._id) {
												return (
													<tr key={chapterAllocation?._id} className="border-b border-darkPurple">
														<td className="px-6 py-4">{chapterAllocation?.chapter.name}</td>
														<td className="px-6 py-4">{chapterAllocation?.teacher.fullname}</td>
														<td className="px-6 py-4">{chapterAllocation?.subject.name}</td>
														<td className="px-6 py-4">Rs. {chapterAllocation?.rate}</td>
														<td className="hover:underline underline-offset-2 cursor-pointer px-6 py-4"><span className={chapterAllocation.hoursCompleted > chapterAllocation.hours ? 'text-red-500' : ""}>{chapterAllocation?.hoursCompleted}</span> / {chapterAllocation?.hours}</td>
													</tr>
												)
											}
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

export default BranchManagerViewerChapterAllocation
