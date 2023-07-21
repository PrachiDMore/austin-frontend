import React, { useState } from 'react'
import { UseBatchesContext } from '../context/Batches'
import SearchableSelect from '../components/SearchableSelect'
import Input from '../components/Input'
import { useEffect } from 'react'
import Button from '../components/Button'
import axios from 'axios'
import extractToken from '../Utils/ExtractToken'
import { UseChapterAllocationContext } from '../context/ChapterAllocation'
import { UseAttendanceContext } from '../context/Attendance'
import addElementInArray from '../Utils/AddUniqueElementsInArray'
import moment from 'moment'

const IndividualAttendanceModal = ({ showModal, setShowModal }) => {
	const { individualBatchOptions } = UseBatchesContext()
	const [batch, setBatch] = useState();
	const [studentOptions, setStudentOptions] = useState([])
	const [startTime, setStartTime] = useState();
	const [date, setDate] = useState("");
	const [endTime, setEndTime] = useState();
	const [hours, setHours] = useState(0);
	const [chapter, setChapter] = useState();
	const [students, setStudents] = useState([]);
	const { individualAttendance, setIndividualAttendance } = UseAttendanceContext()
	const { individualChapterAllocation, setIndividualChapterAllocation } = UseChapterAllocationContext();

	useEffect(() => {
		if (batch) {
			setStudentOptions(batch?.students?.map((student) => {
				return {
					...student,
					label: `${student?.firstname} ${student?.lastname} (${student?.username})`,
					value: student?._id
				}
			}))
		}
	}, [batch]);

	useEffect(() => {
		let endTimeMoment = moment(endTime)
		let startTimeMoment = moment(startTime)
		setHours(Number(endTimeMoment.diff(startTimeMoment, "hour", true).toFixed(1)))
	}, [startTime, endTime]);

	const handleSubmit = (e) => {
		e.preventDefault()
		if (startTime && endTime && batch && date) {
			let studentsArray = students?.map((student) => {
				return student.value
			})
			const date = Date.now()
			axios(`${process.env.REACT_APP_BASE_URL}/individual-attendance/create`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				},
				data: {
					students: studentsArray,
					startTime: startTime,
					endTime: endTime,
					individualBatch: batch.value,
					date: moment(date).format("x"),
					chapter: chapter?.value,
					subject: chapter?.subject?._id,
					allStudents: studentOptions?.map((student) => {
						return student?._id
					}),
					hours: hours
				}
			})
				.then((res) => {
					if (res.data.error) {
						setShowModal({ show: false, update: false, data: undefined })
					} else {
						setIndividualAttendance(addElementInArray(individualAttendance, res?.data?.attendance))
						setShowModal({ show: false, update: false, data: undefined })
					}
				})
		} else {
			alert("Fill the form properly!")
		}
	}
	return (
		<>
			<div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal?.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
				<div className="relative p-4 min-w-[60vw] min-h-max">
					<div className="relative h-full bg-white p-4 rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
						<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
							<h3 className="text-lg font-semibold dark:text-lightPurple">
								{showModal.update ? "Update Attendance" : "Mark Attendance"}
							</h3>
							<button type="button" className="duration-300 text-gray-400 bg-transparent hover:bg-lightPurple hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkPurple dark:hover:text-white" data-modal-toggle="updateProductModal"
								onClick={() => {
									setShowModal({ show: false, update: false, data: undefined })
									setBatch()
									setStudentOptions([])
								}}
							>
								<svg aria-hidden="true" className="w-5 h-5" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						<form action="#" onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-6 gap-y-3'>
							<SearchableSelect label={"Batch"} isMulti={false} value={batch} options={individualBatchOptions} onChange={(e) => { setBatch(e) }} />
							<SearchableSelect label={"Chapter"} isMulti={false} value={chapter} options={individualChapterAllocation?.filter((chapterAllocation) => {
								return chapterAllocation?.individualBatch?._id === batch?.value
							})?.map((chapterAllocation) => {
								return {
									...chapterAllocation,
									label: `${chapterAllocation?.chapter?.name} [${chapterAllocation?.subject?.name}] (${chapterAllocation?.subject?.grade})`,
									value: chapterAllocation?.chapter?._id
								}
							})} onChange={(e) => { setChapter(e) }} />
							<Input onChange={(e) => {
								setDate(e.target.value)
							}} label={"Date"} id={"date"} type="date" placeholder={"Date"} />
							<Input onChange={(e) => {
								const newDate = new Date();
								setStartTime(newDate.setHours(Number(e.target.value.split(":")[0]), Number(e.target.value.split(":")[1])));
							}} label={"Start Time"} id={"startTime"} type="time" placeholder={"Start Time"} />
							<Input onChange={(e) => {
								const newDate = new Date();
								setEndTime(newDate.setHours(Number(e.target.value.split(":")[0]), Number(e.target.value.split(":")[1])));
							}} label={"End Time"} id={"endTime"} type="time" placeholder={"End Time"} />
							<Input label={"Hours"} id={"hours"} type="number" readOnly={true} value={hours} placeholder={"Hours"} step="0.1" />
							<SearchableSelect label={"Students"} isMulti={true} value={students} options={studentOptions} className={"col-span-2"} onChange={(e) => { setStudents(e) }} />
							<div className='flex justify-center w-full col-span-2'>
								<Button text='Submit' type='submit' className={"w-52"} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default IndividualAttendanceModal
