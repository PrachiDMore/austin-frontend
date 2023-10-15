import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import axios from 'axios'
import Button from '../components/Button'
import AssignTeacherInitialState from '../InitialStates/AssignTeacher'
import updateElementsInArray from '../Utils/UpdateUniqueElemetnsInArray'
import addElementInArray from '../Utils/AddUniqueElementsInArray'
import { UseAdmissionContext } from '../context/Admission'
import extractToken from "../Utils/ExtractToken";

const StudentModal = ({ setShowModal, showModal, setMessage }) => {
	const { admissions, setAdmissions } = UseAdmissionContext()
	const [loading, setLoading] = useState(false)
	const initialState = {
		username: "",
		password: "",
		confirmPassword: ""
	}
	const [formState, setFormState] = useState(initialState);

	useEffect(() => {
		setFormState(showModal.data)
	}, [showModal]);

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		if (showModal.update) {
			if (formState.confirmPassword === formState.password) {
				axios(`${process.env.REACT_APP_BASE_URL}/user/admin/update/${showModal?.data?._id}`, {
					method: "PATCH",
					headers: {
						Authorization: `Bearer ${extractToken()?.token}`
					},
					data: formState,
				})
					.then((res) => {
						setLoading(false)
						if (res.data.error) {
							// console.log(res.data.error)
							setShowModal({ show: false, update: false, data: undefined })
						} else {
							setAdmissions(updateElementsInArray(admissions, res.data.student, showModal.data))
							setShowModal({ show: false, update: false, data: undefined })
						}
					})
			}
		}
	}

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}

	return (
		<>
			<div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
				<div className="relative p-4 w-[50vw] h-max">
					<div className="relative h-full bg-white p-4 rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
						<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
							<h3 className="text-lg font-semibold dark:text-lightPurple">
								{"Update Student Information"}
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
						<form onSubmit={handleSubmit} className='grid grid-cols-1 gap-x-6 gap-y-5 '>
							<Input onChange={handleChange} value={formState?.username} label={"Username"} id={"username"} type={"text"} />
							<Input onChange={handleChange} value={formState?.password} label={"Password"} id={"password"} type={"password"} />
							<Input onChange={handleChange} value={formState?.confirmPassword} label={"Confirm Password"} id={"confirmPassword"} type={"password"} />
							<div className={"col-span-1 flex justify-center"}>
								<Button loading={loading} text='Submit' type='submit' className={"w-52"} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default StudentModal