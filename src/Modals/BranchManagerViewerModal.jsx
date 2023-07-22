import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import Select from '../components/Select'
import BranchManagerInitialState from '../InitialStates/BranchManagerInitialState'
import axios from 'axios';
import Button from '../components/Button';
import addElementInArray from '../Utils/AddUniqueElementsInArray';
import updateElementsInArray from '../Utils/UpdateUniqueElemetnsInArray';
import { UseBranchManagerContext } from '../context/BranchManager';
import extractToken from "../Utils/ExtractToken";
import { UseBranchManagerViewerContext } from '../context/BranchManagerViewer';

const BranchManagerViewerModal = ({ setShowModal, showModal, setMessage }) => {
	const { BranchManagerViewers, setBranchManagerViewers } = UseBranchManagerViewerContext()
	const [formState, setFormState] = useState(BranchManagerInitialState);

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
			axios(`${process.env.REACT_APP_BASE_URL}/branch-manager-viewer/${showModal?.data?._id}`, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				},
				data: formState
			})
				.then((res) => {
					if (res.data.error) {
						setMessage(res.data.message)
					} else {
						setMessage(res.data.message)
						setShowModal({ show: false, update: false, data: undefined })
						setFormState(BranchManagerInitialState);
						setBranchManagerViewers(updateElementsInArray(BranchManagerViewers, res?.data?.user, showModal?.data))
					}
				})
		} else {
			axios(`${process.env.REACT_APP_BASE_URL}/branch-manager-viewer/create`, {
				method: "POST",
				data: formState,
				headers: {
					Authorization: `Bearer ${extractToken()?.token}`
				},
			})
				.then((res) => {
					if (res.data.error) {
						setMessage(res.data.message)
					} else {
						setMessage(res.data.message)
						setShowModal({ show: false, update: false, data: undefined })
						setFormState(BranchManagerInitialState);
						setBranchManagerViewers(addElementInArray(BranchManagerViewers, res?.data?.user))
					}
				})
		}
	}
	return (
		<>
			<div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
				<div className="p-4 w-[60vw] h-max">
					<div className="relative h-full bg-white p-4 rounded-lg shadow-md shadow-purpleShadow overflow-auto">
						<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
							<h3 className="text-lg font-semibold dark:text-lightPurple">
								{showModal.update ? "Update Branch Manager Viewer" : "Add Branch Manager Viewer"}
							</h3>
							<button type="button" className="duration-300 text-gray-400 bg-transparent hover:bg-lightPurple hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkPurple dark:hover:text-white" data-modal-toggle="updateProductModal"
								onClick={() => {
									setShowModal({ show: false, update: false, data: undefined });
									setFormState(BranchManagerInitialState)
								}}
							>
								<svg aria-hidden="true" className="w-5 h-5" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						<form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-6 gap-y-4'>
							<Input label={"First Name"} value={formState.firstname} onChange={handleChange} id={"firstname"} />
							<Input label={"Last Name"} value={formState.lastname} onChange={handleChange} id={"lastname"} />
							<Input label={"Email"} value={formState.email} onChange={handleChange} id={"email"} />
							<Input label={"Username"} value={formState.username} onChange={handleChange} id={"username"} />
							{!showModal?.update && <Input label={"Password"} password={true} onChange={handleChange} id={"password"} />}
							<Input label={"Phone Number"} value={formState.phonenumber} onChange={handleChange} id={"phonenumber"} />
							<Select label={"Disabled"} value={formState.isDisabled} onChange={handleChange} id={"isDisabled"} options={[{ label: "Disable", value: true }, { label: "Enable", value: false }]} />
							<div className='col-span-2 flex justify-center'>
								<Button type='submit' text='Submit' className={"w-max px-12"} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default BranchManagerViewerModal