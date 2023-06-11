import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'
import RolesModal from '../Modals/RolesModal'

const Roles = () => {
	const [showModal, setShowModal] = useState({ show: false, update: false, data: undefined })
	return (
		<>
			<div>
				<Navbar />
				<RolesModal setShowModal={setShowModal} showModal={showModal}/>
				<section className='w-screen min-h-screen p-10 px-20 Nunito'>
					<div className='flex w-full justify-between'>
						<div className='w-[90%]'>
							<Input onChange type={'text'} placeholder={'Search...'} />
							<GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
						</div>
						<div className='ml-[10px] flex justify-end w-[10%]'>
							<button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="h-max block text-white bg-lightPurple hover:bg-darkPurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-darkPurple dark:hover:bg-lightPurple dark:focus:ring-lightPurple" type="button" onClick={() => {
								setShowModal({ show: true, update: false, data: undefined })
							}}>
								Create Role
							</button>
						</div>
					</div>
					<div className="mx-auto">
						<div className="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
							<div className="overflow-x-auto">
								<table className="w-full text-left text-gray-500 dark:text-gray-400">
									<thead className="text-sm uppercase bg-darkPurple text-white">
										<tr>
											<th scope="col" className="px-6 py-5">Name</th>
											<th scope="col" className="px-6 py-5">Username</th>
											<th scope="col" className="px-6 py-5">Grade</th>
											<th scope="col" className="px-6 py-5">Email</th>
											<th scope="col" className="px-6 py-5">Phone Number</th>
											<th scope="col" className="px-6 py-5">Gender</th>
										</tr>
									</thead>
									<tbody className='text-gray-700 mt-5'>
										{/* {
											searchAdmissions?.map((data) => {
												return <tr key={data?._id} className={data?.confirmed ? "border-b border-darkPurple bg-green-200" : "border-b border-darkPurple"}>
													<th><Link to={`/admin/admissions/${data?._id}`} scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{data?.firstname} {data?.lastname}</Link></th>
													<td className="px-6 py-4">{data?.username || "N/A"}</td>
													<td className="px-6 py-4">{data?.grade}</td>
													<td className="px-6 py-4">{data?.email}</td>
													<td className="px-6 py-4">{data?.mobileNoPrimary}</td>
													<td className="px-6 py-4 capitalize">{data?.gender}</td>
												</tr>
											})
										} */}
									</tbody>
								</table>
							</div>
						</div>
					</div>


				</section>
			</div>
		</>
	)
}

export default Roles
