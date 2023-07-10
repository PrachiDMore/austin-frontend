import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'
import { GrSearch } from 'react-icons/gr'
import { UseAttendanceContext } from '../../context/Attendance'
import moment from 'moment'
import IndividualAttendanceModal from '../../Modals/IndividualAttendanceModal'
import IndividualDisplayAttendance from '../../Modals/IndividualDisplayAttendance'

const IndividualTeacherAttendance = () => {
	const [displayAttendance, setDisplayAttendance] = useState({ show: false, update: false, data: undefined });
	const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined });
	const { individualAttendance } = UseAttendanceContext();
	const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setSearchResults(individualAttendance);
    }, [individualAttendance])

    const handleSearch = (e) => {
        if (e.target.value.length == 0) {
            setSearchResults(individualAttendance)
        } else {
            setSearchResults(individualAttendance?.filter((data) => {
                return `${data?.individualBatch?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.chapter?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.subject?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.teacher?.fullname}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
            }))
        }
    }
	return (
		<>
			<Navbar />
			<IndividualAttendanceModal key={Date.now()} showModal={showModal} setShowModal={setShowModal} />
			<IndividualDisplayAttendance key={Date.now() + 1} showModal={displayAttendance} setShowModal={setDisplayAttendance} />
			<section className='w-screen min-h-screen p-10 px-20 Nunito'>
				<div className='flex'>
					<div className='w-[85%]'>
						<Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
						<GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
					</div>
					<div className='ml-[10px] w-[15%]'>
						<button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-lightPurple hover:bg-darkPurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-darkPurple dark:hover:bg-lightPurple dark:focus:ring-lightPurple w-full" type="button" onClick={() => {
							setShowModal({ show: true, update: false, data: undefined })
						}}>
							Mark Attendance
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
										<th scope="col" className="px-6 py-5">Students</th>
										<th scope="col" className="px-6 py-5">Chapter (Subject)</th>
										<th scope="col" className="px-6 py-5">Date</th>
										<th scope="col" className="px-6 py-5">Start Time - End Time</th>
									</tr>
								</thead>
								<tbody className='text-gray-700 mt-5'>
									{
										searchResults?.map((data) => {
											return <tr key={data?._id} onClick={() => {
												setDisplayAttendance({ show: true, data: data })
											}} className="border-b border-darkPurple">
												<th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{data?.individualBatch?.name}</th>
												<td className="px-6 py-4">{data?.students?.length}</td>
												<td className="px-6 py-4">{data?.chapter?.name} ({data?.subject?.name})</td>
												<td className="px-6 py-4">{moment(data?.date).format("do MMM, YYYY")}</td>
												<td className="px-6 py-4">{moment(data?.startTime).format("hh:mm a") + " - " + moment(data?.endTime).format("hh:mm a")}</td>
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

export default IndividualTeacherAttendance
