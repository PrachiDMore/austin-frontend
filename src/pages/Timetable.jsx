import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'
import { FiEdit3 } from 'react-icons/fi'
import TimetableModal from '../Modals/TimetableModal'

const Timetable = () => {
	const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined })
	const handleSearch = (e) => {

	}
	return (
		<>
			<Navbar />
			<TimetableModal setShowModal={setShowModal} showModal={showModal} />
			<section className='w-screen min-h-screen p-10 px-20 Nunito'>
				<div className='flex'>
					<div className='w-[85%]'>
						<Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
						<GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
					</div>
					<div className='ml-[10px] w-[15%] min-w-[15%]'>
						<button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="w-full block text-white bg-lightPurple hover:bg-darkPurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-darkPurple dark:hover:bg-lightPurple dark:focus:ring-lightPurple" type="button" onClick={() => {
							setShowModal({ show: true, update: false, data: undefined })
						}}>
							Add Timetable
						</button>
					</div>
				</div>


				<div className="mx-auto">
					<div className="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-left text-gray-500 dark:text-gray-400">
								<thead className="text-sm uppercase bg-darkPurple text-white">
									<tr>
										<th scope="col" className="px-6 py-5">Title</th>
										<th scope="col" className="px-6 py-5">Batch</th>
										<th scope="col" className="px-6 py-5">Date</th>
										<th scope="col" className="px-6 py-5">Actions</th>
									</tr>
								</thead>
								<tbody className='text-gray-700 mt-5'>
									{
										[]?.map((data) => {
											return <tr key={data?._id} className="border-b border-darkPurple">
												<th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{data?.firstname} {data?.lastname}</th>
												<td className="px-6 py-4">{data?.email}</td>
												<td className="px-6 py-4">{data?.phonenumber}</td>
												<td className="px-6 py-4">{data?.username}</td>
												<td className="px-6 py-4 capitalize flex gap-3">
													<span onClick={() => {
													}} className='text-white bg-darkPurple h-8 w-8 flex items-center justify-center cursor-pointer rounded-lg'><FiEdit3 /></span>
													{/* <span><FiTrash/></span> */}
												</td>
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

export default Timetable
