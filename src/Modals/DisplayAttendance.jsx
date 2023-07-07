import React, { useState } from 'react'
import Input from '../components/Input'
import moment from 'moment'
import Button from '../components/Button'
import { useEffect } from 'react'
import CheckBox from "../components/Checkbox"

const DisplayAttendance = ({ showModal, setShowModal }) => {
	const [displayState, setDisplayState] = useState(0);
	const [students, setStudents] = useState([])
	useEffect(() => {
		if (showModal?.data) {
			let presentArray = showModal?.data?.students?.map((student) => {
				return student?._id
			})
			let finalArray = showModal?.data?.allStudents?.map((student) => {
				if (presentArray?.includes(student?._id)) {
					return {
						...student,
						present: true
					}
				} else {
					return {
						...student,
						present: false
					}
				}
			})
			setStudents(finalArray)
		}
	}, [showModal]);
	return (
		<div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
			<div className="relative p-4 w-[70vw] h-auto">
				<div className="relative p-4 bg-white rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
					<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
						<h3 className="text-lg font-semibold dark:text-lightPurple">
							{"View Attendance"}
						</h3>
						<button type="button" className="duration-300 text-gray-400 bg-transparent hover:bg-lightPurple hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkPurple dark:hover:text-white" data-modal-toggle="updateProductModal"
							onClick={() => {
								setShowModal({ show: false, update: false, data: undefined })
							}}
						>
							<svg aria-hidden="true" className="w-5 h-5" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					<div className={displayState === 0 ? 'grid grid-cols-2 gap-x-6 gap-y-4' : "hidden"} >
						<Input readOnly={true} label={"Batch Name"} placeholder={"Batch name"} value={showModal?.data?.batch?.name} />
						<Input readOnly={true} label={"Teacher Name"} placeholder={"Teacher name"} value={showModal?.data?.teacher?.fullname} />
						<Input readOnly={true} label={"Chapter Name"} placeholder={"Chapter name"} value={showModal?.data?.chapter?.name} />
						<Input readOnly={true} label={"Subject Name"} placeholder={"Subject name"} value={showModal?.data?.subject?.name} />
						<Input readOnly={true} label={"Date"} placeholder={"Date"} value={moment(showModal?.data?.date).format("do MMM, YYYY")} />
						<Input readOnly={true} label={"Start Time - End Time"} placeholder={"Start Time - End Time"} value={moment(showModal?.data?.startTime).format("hh:mm a") + " - " + moment(showModal?.data?.endTime).format("hh:mm a")} />
						<Button text='View Students' className={"col-span-2 w-52 m-auto"} onClick={() => { setDisplayState(1) }} />
					</div>
					<div className={displayState === 1 ? 'grid grid-cols-1 gap-4 max-h-[50vh] overflow-y-auto' : "hidden"} >
						<div className='flex items-center gap-5'>
							<span className='cursor-pointer text-sm font-bold text-darkPurple' onClick={() => { setDisplayState(0) }}>Back</span>
							<Input placeholder={"Search..."} className={"w-full"} />
						</div>
						<div className='grid grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto'>
							{
								students?.map((student) => {
									return <div className='gap-2 items-center grid grid-cols-12'>
										<Input value={`${student?.firstname} ${student?.lastname}`} className={"col-span-10"} />
										<CheckBox checked={student?.present} />
									</div>
								})
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DisplayAttendance
