import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { GrSearch } from 'react-icons/gr'
import { UseChapterAllocationContext } from '../../context/ChapterAllocation'
import Navbar from '../../components/Navbar'

const StudentCourseIndividualChapters = () => {
	const { individualChapterAllocation } = UseChapterAllocationContext();
	const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setSearchResults(individualChapterAllocation);
    }, [individualChapterAllocation])

    const handleSearch = (e) => {
        if (e.target.value.length == 0) {
            setSearchResults(individualChapterAllocation)
        } else {
            setSearchResults(individualChapterAllocation?.filter((data) => {
                return `${data?.individualBatch?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.chapter?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.subject?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.teacher?.fullname}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
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
										<th scope="col" className="px-6 py-5">Chapter Name</th>
										<th scope="col" className="px-6 py-5">Teacher Name</th>
										<th scope="col" className="px-6 py-5">Subject</th>
										<th scope="col" className="px-6 py-5">Batch</th>
										<th scope="col" className="px-6 py-5">Hours Completed / Hours</th>
									</tr>
								</thead>
								<tbody className='text-gray-700 mt-5'>
									{
										searchResults?.map((chapterAllocation) => {
											return (
												<tr key={chapterAllocation?._id} onClick={() => {
												}} className="border-b border-darkPurple">
													<td className="px-6 py-4">{chapterAllocation?.chapter.name}</td> 
													<td className="px-6 py-4">{chapterAllocation?.teacher.fullname} </td>
													<td className="px-6 py-4">{chapterAllocation?.subject.name}</td>
													<td className="px-6 py-4">{chapterAllocation?.individualBatch.name}</td> 
													<td className="hover:underline underline-offset-2 cursor-pointer px-6 py-4"><span className={chapterAllocation.hoursCompleted > chapterAllocation.hours ? 'text-red-500' : ""}>{(chapterAllocation?.hoursCompleted/chapterAllocation?.hours)*100 > 100 ? "100% + extra" : `${Math.floor((chapterAllocation?.hoursCompleted/chapterAllocation?.hours)*100)}%` }</span></td>
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

export default StudentCourseIndividualChapters
