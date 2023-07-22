import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'
import { FiEdit3 } from 'react-icons/fi'
import { UseAttendanceContext } from '../context/Attendance'
import moment from 'moment';
import DisplayAttendance from "../Modals/DisplayAttendance";
import Button from '../components/Button'
import axios from 'axios'
import extractToken from '../Utils/ExtractToken'
import Alert from '../components/Alert'

const Attendance = () => {
	const { attendance } = UseAttendanceContext();
	const [displayAttendance, setDisplayAttendance] = useState({ show: false, data: undefined })
	const [searchResults, setSearchResults] = useState([])
	const [message, setMessage] = useState("")

	const approveAttendance = (_id) => {
		if (_id) {
			axios(`${process.env.REACT_APP_BASE_URL}/attendance/approve/${_id}`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				}
			})
				.then((res) => {
					if (!res.data.error) {
						window.location.reload()
					} else {
						setMessage(res.data.message)
					}
				})
				.catch((err) => {
					setMessage(err.message)
				})
		}
	}

	useEffect(() => {
		setSearchResults(attendance);
	}, [attendance])

	const handleSearch = (e) => {
		if (e.target.value.length == 0) {
			setSearchResults(attendance)
		} else {
			setSearchResults(attendance?.filter((data) => {
				return `${data?.batch?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.chapter?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.subject?.name}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || `${data?.teacher?.fullname}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
			}))
		}
	}
	return (
		<>
			<Navbar />
			<Alert setMessage={setMessage} message={message} />
			<DisplayAttendance key={Date.now()} showModal={displayAttendance} setShowModal={setDisplayAttendance} />
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
										<th scope="col" className="px-6 py-5">Approve</th>
									</tr>
								</thead>
								<tbody className='text-gray-700 mt-5'>
									{
										searchResults?.map((data) => {
											return <tr key={data?._id} className="border-b border-darkPurple">
												<th scope="row" className="hover:underline underline-offset-2 cursor-pointer px-4 py-3 font-medium text-gray-900 whitespace-nowrap" onClick={() => {
													setDisplayAttendance({ show: true, data: data })
												}}>{data?.batch?.name}</th>
												<td className="cursor-pointer px-6 py-4">{data?.students?.length}/{data?.allStudents?.length}</td>
												<td className="cursor-pointer px-6 py-4">{data?.chapter?.name} ({data?.subject?.name})</td>
												<td className="cursor-pointer px-6 py-4">{moment(data?.date).format("Do MMM, YYYY")}</td>
												<td className="cursor-pointer px-6 py-4">{moment(data?.startTime).format("hh:mm a") + " - " + moment(data?.endTime).format("hh:mm a")}</td>
												<td className="cursor-pointer px-6 py-4 capitalize">
													{data?.teacher?.fullname}
												</td>
												<td className="px-6 py-4"><Button onClick={() => {
													approveAttendance(data?._id)
												}} disabled={data?.approved} className={"py-2"} text='Approve' /></td>
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

export default Attendance
