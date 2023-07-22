import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { UseBranchContext } from '../context/Branch'
import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'
import BranchModal from '../Modals/BranchModal'
import Alert from '../components/Alert'

const ViewBranch = () => {
	const { branches } = UseBranchContext();
	const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined });
	const [searchResults, setSearchResults] = useState([])
	const [message, setMessage] = useState("")

	useEffect(() => {
		setSearchResults(branches);
	}, [branches])

	const handleSearch = (e) => {
		if (e.target.value.length == 0) {
			setSearchResults(branches)
		} else {
			setSearchResults(branches?.filter((data) => {
				return `${data?.name} ${data?.grade}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
			}))
		}
	}
	return (
		<>
			<Alert setMessage={setMessage} message={message} />
			<Navbar />
			<BranchModal showModal={showModal} setShowModal={setShowModal} setMessage={setMessage} />
			<section className='w-screen min-h-screen p-10 px-20 Nunito'>
				<div className='flex'>
					<div className='w-[90%]'>
						<Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
						<GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
					</div>
					<div className='ml-[10px] flex justify-between w-[10%]'>
						<button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="h-max block text-white bg-lightPurple hover:bg-darkPurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-darkPurple dark:hover:bg-lightPurple dark:focus:ring-lightPurple" type="button" onClick={() => {
							setShowModal({ show: true, update: false, data: undefined })
						}}>
							Add Branch
						</button>
					</div>
				</div>
				<div className="mx-auto">
					<div className="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-left text-gray-500 dark:text-gray-400">
								<thead className="text-sm uppercase bg-darkPurple text-white">
									<tr>
										<th scope="col" className="px-6 py-5">Branch Name</th>
										<th scope="col" className="px-6 py-5">City</th>
										<th scope="col" className="px-6 py-5">Pincode</th>
										<th scope="col" className="px-6 py-5">State</th>
									</tr>
								</thead>
								<tbody className='text-gray-700 mt-5'>
									{
										searchResults?.map((branch) => {
											return (
												<tr key={branch?._id} onClick={() => {
													setShowModal({ show: true, update: true, data: branch })
												}} className="border-b border-darkPurple">
													<td className="px-6 py-4">{branch?.name}</td>
													<td className="px-6 py-4">{branch?.city}</td>
													<td className="px-6 py-4">{branch?.pincode}</td>
													<td className="px-6 py-4">{branch?.state}</td>
												</tr>
											)
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

export default ViewBranch
