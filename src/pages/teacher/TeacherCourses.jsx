import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'
import { GrSearch } from 'react-icons/gr'
import { UseBatchesContext } from '../../context/Batches'
import { UseCourseContext } from '../../context/Courses'

const TeacherCourses = () => {
	const { courses } = UseCourseContext();
	return (
		<>
			<Navbar />
			<section className='w-screen min-h-screen p-10 px-20 Nunito'>
				<div className='flex'>
					<div className='w-full'>
						<Input onChange type={'text'} placeholder={'Search...'} />
						<GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
					</div>
				</div>
				<div className="mx-auto">
					<div className="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-left text-gray-500 dark:text-gray-400">
								<thead className="text-sm uppercase bg-darkPurple text-white">
									<tr>
										<th scope="col" className="px-6 py-5">Courses Name</th>
										<th scope="col" className="px-6 py-5">Grade</th>
										<th scope="col" className="px-6 py-5">Subjects</th>
										<th scope="col" className="px-6 py-5">ID</th>
									</tr>
								</thead>
								<tbody className='text-gray-700 mt-5'>
									{
										courses?.map((course) => {
											return (
												<tr key={course?._id} className="border-b border-darkPurple">
													<td className="px-6 py-4">{course?.name}</td>
													<td className="px-6 py-4">{course?.grade}</td>
													<td className="px-6 py-4">{course?.subjects?.length}</td>
													<td className="px-6 py-4">{course?._id}</td>
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

export default TeacherCourses
