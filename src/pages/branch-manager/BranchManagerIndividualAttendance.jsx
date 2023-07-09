import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'
import { GrSearch } from 'react-icons/gr'
import { UseAttendanceContext } from '../../context/Attendance'
import moment from 'moment';
import IndividualDisplayAttendance from "../../Modals/IndividualDisplayAttendance";
import { UseAuthContext } from '../../context/Authentication'

const BranchManagerIndividualAttendance = () => {
	const { individualAttendance } = UseAttendanceContext();
	const [displayAttendance, setDisplayAttendance] = useState({ show: false, data: undefined })
	const { user } = UseAuthContext()
	const handleSearch = (e) => {

	}
	return (
		<>
			<Navbar />
			<IndividualDisplayAttendance key={Date.now()} showModal={displayAttendance} setShowModal={setDisplayAttendance} />
			<section className='w-screen min-h-screen p-10 px-20 Nunito'>
				<div className='flex'>
					<div className='w-[100%]'>
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
										<th scope="col" className="px-6 py-5">Students Present</th>
										<th scope="col" className="px-6 py-5">Chapter (Subject)</th>
										<th scope="col" className="px-6 py-5">Date</th>
										<th scope="col" className="px-6 py-5">Start Time - End Time</th>
										<th scope="col" className="px-6 py-5">Teacher</th>
									</tr>
								</thead>
								<tbody className='text-gray-700 mt-5'>
									{
										individualAttendance?.map((data) => {
											if (data?.individualBatch?.branch?.manager === user?._id) {
												return <tr key={data?._id} onClick={() => {
													setDisplayAttendance({ show: true, data: data })
												}} className="border-b border-darkPurple">
													<th scope="row" className="cursor-pointer px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{data?.individualBatch?.name}</th>
													<td className="cursor-pointer px-6 py-4">{data?.students?.length}/{data?.allStudents?.length}</td>
													<td className="cursor-pointer px-6 py-4">{data?.chapter?.name} ({data?.subject?.name})</td>
													<td className="cursor-pointer px-6 py-4">{moment(data?.date).format("do MMM, YYYY")}</td>
													<td className="cursor-pointer px-6 py-4">{moment(data?.startTime).format("hh:mm a") + " - " + moment(data?.endTime).format("hh:mm a")}</td>
													<td className="cursor-pointer px-6 py-4 capitalize flex gap-3">
														{data?.teacher?.fullname} ({data?.teacher?.username})
													</td>
												</tr>
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

export default BranchManagerIndividualAttendance
