import { useEffect, useState } from 'react';
import { UseTeacherContext } from '../context/Teachers'
import { UseBranchContext } from '../context/Branch';
import Input from '../components/Input';
import batchInitialState from '../InitialStates/BatchForm';
import Select from '../components/Select';
import SearchableSelect from '../components/SearchableSelect';
import addElementInArray from '../Utils/AddUniqueElementsInArray.jsx'
import updateElementsInArray from '../Utils/UpdateUniqueElemetnsInArray'
import { UseCourseContext } from '../context/Courses';
import { UseBatchesContext } from '../context/Batches';
import axios from 'axios';
import Button from '../components/Button';
import { UseAdmissionContext } from '../context/Admission';
import extractToken from "../Utils/ExtractToken";

const BatchModal = ({ setShowModal, showModal, setMessage }) => {
	const { admissionOptions } = UseAdmissionContext()
	const { branchOptions } = UseBranchContext();
	const { batches, setBatches } = UseBatchesContext()
	const { courseOptions } = UseCourseContext();
	const [formState, setFormState] = useState(batchInitialState);
	const [course, setCourse] = useState();
	const [branch, setBranch] = useState();
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (showModal.update) {
			setLoading(true)
			axios(`${process.env.REACT_APP_BASE_URL}/batch/${showModal?.data?._id}`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				},
				data: {
					...formState, course: course?.value, branch: branch?.value, students: students?.map((student) => {
						return student.value
					})
				}
			})
				.then((res) => {
					setLoading(false)
					if (res.data.error) {
						setMessage(res.data.message)
					} else {
						setMessage(res.data.message)
						setBatches(updateElementsInArray(batches, res.data.batch, showModal.data))
						setShowModal({ show: false, update: false, data: undefined })
						setStudents([])
						setBranch()
						setCourse()
					}
				})
		} else {
			setLoading(true)
			axios(`${process.env.REACT_APP_BASE_URL}/batch/create`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				},
				data: {
					...formState, typeOfBatch: "regular", course: course?.value, branch: branch?.value, students: students?.map((student) => {
						return student.value
					})
				}
			})
				.then((res) => {
					setLoading(false)
					if (res.data.error) {
						setMessage(res.data.message)
					} else {
						setMessage(res.data.message)
						setBatches(addElementInArray(batches, res.data.batch))
						setShowModal({ show: false, update: false, data: undefined })
						setStudents([])
						setBranch()
						setCourse()
					}
				})
				.catch((err) => {
					setMessage(err.message);
				})
		}
	}

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}

	useEffect(() => {
		if (showModal.update) {
			setFormState(showModal.data);
			setBranch(branchOptions?.filter((branch) => {
				return branch?._id === showModal?.data?.branch?._id;
			})[0])
			setCourse(courseOptions?.filter((course) => {
				return course?._id === showModal?.data?.course?._id;
			})[0])
			setStudents(showModal?.data?.students?.map((student) => {
				return {
					...student,
					label: `${student?.firstname} ${student?.lastname} (${student?.grade})`,
					value: student?._id
				}
			}))
		} else {
			setFormState(batchInitialState)
			setStudents([])
			setBranch()
			setCourse()
		}
	}, [showModal]);


	return (
		<>
			<div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
				<div className="relative p-4 w-[60vw] h-auto">
					<div className="relative h-full bg-white p-4 rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
						<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
							<h3 className="text-lg font-semibold dark:text-lightPurple">
								{showModal.update ? "Update Batch" : "Add Batch"}
							</h3>
							<button type="button" className="duration-300 text-gray-400 bg-transparent hover:bg-lightPurple hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkPurple dark:hover:text-white" data-modal-toggle="updateProductModal"
								onClick={() => {
									setShowModal({ show: false, update: false, data: undefined })
									setBranch()
								}}
							>
								<svg aria-hidden="true" className="w-5 h-5" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						<form action="#" onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-6 gap-y-3'>
							<SearchableSelect label={"Students"} value={students} onChange={(e) => { setStudents(e) }} isMulti={true} options={admissionOptions?.filter((admission) => {
								return admission.mode !== "Individual"
							})} className={"col-span-2"} />
							<Input onChange={handleChange} label={"Name"} id={"name"} value={formState.name} placeholder={"Batch name"} />
							<Input onChange={handleChange} label={"Academic Year"} id={"academicYear"} value={formState.academicYear} placeholder={"Academic year (2022-2023)"} />
							<SearchableSelect onChange={(e) => { setBranch(e) }} label={"Branch"} value={branch} options={branchOptions} />
							<SearchableSelect label={"Course"} onChange={(e) => { setCourse(e) }} value={course} options={courseOptions} />
							<div className='col-span-2 flex justify-center'>
								<Button loading={loading} text='Submit' type='submit' className={"w-max px-12"} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default BatchModal