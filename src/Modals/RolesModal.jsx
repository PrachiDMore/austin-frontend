import React, { useState } from 'react'
import SearchableSelect from '../components/SearchableSelect'
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import RolesInitialState from '../InitialStates/Roles';

const RolesModal = ({ showModal, setShowModal }) => {
	const [formState, setFormState] = useState(RolesInitialState);

	const handleChange = (e) => {
		if (e.target.type === "checkbox") {
			setFormState({
				...formState,
				[e.target.id]: Boolean(e.target.checked)
			})
		} else {
			setFormState({
				...formState,
				[e.target.id]: e.target.value
			})
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<>
			<div id="updateProductModal" tabIndex="-1" aria-hidden="true" className={showModal?.show ? "bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full duration-300 opacity-100" : "opacity-0 pointer-events-none duration-300 bg-black bg-opacity-40 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen md:inset-0  md:h-full"}>
				<div className="relative p-4 w-[60vw] h-auto">
					<div className="relative h-full bg-white p-4 rounded-lg shadow-md shadow-purpleShadow dark:bg-white-800 sm:p-5">
						<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-lightPurple ">
							<h3 className="text-lg font-semibold dark:text-lightPurple">
								{showModal?.update ? "Update Role" : "Add Role"}
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
						<form onSubmit={handleSubmit} action="#" className='grid grid-cols-2 gap-x-6 gap-y-3'>
							<Input onChange={handleChange} label={"Role Name"} id={"role"} value={formState?.role} placeholder={"Role name"} />
							<Input onChange={handleChange} label={"Academic Year"} id={"academicYear"} value={formState?.academicYear} placeholder={"Academic year (2022-2023)"} />
							<Checkbox label={"Can manage branch"} id={"canManageUsers"} onChange={handleChange}/>
							<Select options={[{ value: 'one-on-one', label: "One-On-One" }, { value: 'regular', label: "Regular" }]} onChange={handleChange} label={"Type Of Batch"} id={"typeOfBatch"} value={formState?.typeOfBatch} />
							<div className='col-span-2 flex justify-center'>
								<Button text='Submit' type='submit' className={"w-max px-12"} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default RolesModal
