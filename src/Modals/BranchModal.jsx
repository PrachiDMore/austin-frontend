import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import branchInitialState from '../InitialStates/BranchForm'
import axios from 'axios';
import Button from '../components/Button';
import { UseBranchContext } from '../context/Branch';
import addElementInArray from '../Utils/AddUniqueElementsInArray';
import updateElementsInArray from '../Utils/UpdateUniqueElemetnsInArray';

const BranchModal = ({ setShowModal, showModal }) => {
	const { branches, setBranches } = UseBranchContext()
	const [formState, setFormState] = useState(branchInitialState);
	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}

	useEffect(() => {
		if (showModal.update) {
			setFormState(showModal.data)
		}
	}, [showModal]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (showModal.update) {
			axios(`${process.env.REACT_APP_BASE_URL}/branch/${showModal.data._id}`, {
				method: "PATCH",
				data: formState
			})
				.then((res) => {
					console.log(res.data)
					if (res.data.error) {
						alert(res.data.message)
					} else {
						setShowModal({ show: false, update: false, data: undefined })
						setFormState(branchInitialState);
						setBranches(updateElementsInArray(branches, res?.data?.branch, showModal.data))
					}
				})
		} else {
			axios(`${process.env.REACT_APP_BASE_URL}/branch/create`, {
				method: "POST",
				data: formState
			})
				.then((res) => {
					console.log(res.data)
					if (res.data.error) {
						alert(res.data.message)
					} else {
						setShowModal({ show: false, update: false, data: undefined })
						setFormState(branchInitialState);
						setBranches(addElementInArray(branches, res?.data?.branch))
					}
				})
		}
	}
	return (
		<>
			<div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
				<div className="p-4 w-[75vw] h-[75vh]">
					<div className="relative h-full bg-white p-4 rounded-lg shadow-md shadow-purpleShadow overflow-auto">
						<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
							<h3 className="text-lg font-semibold dark:text-lightPurple">
								{showModal.update ? "Update Branch" : "Add Branch"}
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
						<form onSubmit={handleSubmit} className='grid grid-cols-3 gap-x-6 gap-y-4'>
							<Input label={"Name"} value={formState.name} onChange={handleChange} id={"name"} />
							<Input label={"Address Line"} value={formState.addressline} onChange={handleChange} id={"addressline"} />
							<Input label={"Street"} value={formState.street} onChange={handleChange} id={"street"} />
							<Input label={"City"} value={formState.city} onChange={handleChange} id={"city"} />
							<Input label={"State"} value={formState.state} onChange={handleChange} id={"state"} />
							<Input label={"Country"} value={formState.country} onChange={handleChange} id={"country"} />
							<Input label={"Pincode"} value={formState.pincode} onChange={handleChange} id={"pincode"} />
							<Input label={"Landmark"} value={formState.landmark} onChange={handleChange} id={"landmark"} />
							<Input label={"Branch Logo"} value={formState.branch_logo} onChange={handleChange} id={"branch_logo"} />
							<Input label={"Email"} value={formState.email} onChange={handleChange} id={"email"} />
							<Input label={"Phone"} value={formState.phone} onChange={handleChange} id={"phone"} />
							<div className='col-span-3 flex justify-center'>
								<Button type='submit' text='Submit' className={"w-max px-12"} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default BranchModal
