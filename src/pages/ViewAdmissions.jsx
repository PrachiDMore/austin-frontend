import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'
import axios from 'axios'
import { Link } from 'react-router-dom'
import extractToken from '../Utils/ExtractToken'

const ViewAdmissions = ({role}) => {
  const [admissions, setAdmissions] = useState([]);
  const [searchAdmissions, setSearchAdmissions] = useState([]);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/admission/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${extractToken()?.token}`
      }
    })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.message)
        } else {
          setAdmissions(res.data.admissions);
        }
      })
  }, []);


  const handleSearch = (e) => {
    if (e.target.value.length == 0) {
      setSearchAdmissions(admissions)
    } else {
      setSearchAdmissions(admissions.filter((data) => {
        return `${data.firstname} ${data.lastname}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || data?.gender?.toLowerCase()?.includes(e.target.value.toLowerCase()) || data?.email?.toLowerCase()?.includes(e.target.value.toLowerCase()) || data?.mobileNoPrimary?.toLowerCase()?.includes(e.target.value.toLowerCase()) || data?.grade?.toLowerCase()?.includes(e.target.value.toLowerCase())
      }))
    }
  }
  useEffect(() => {
    if (admissions) {
      setSearchAdmissions(admissions)
    }
  }, [admissions]);

  return (
    <div>
      <Navbar />
      <section className='w-screen min-h-screen p-10 px-20 Nunito'>
        <div className='w-full '>
          <Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
          <GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
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
                  {
                    searchAdmissions?.map((data) => {
                      return <tr key={data?._id} className={data?.confirmed ? " border-b border-darkPurple bg-green-200" : "border-b border-darkPurple"}>
                        <th><Link to={role === "admin" ? `/admin/admissions/${data?._id}` : role === "manager" ? `/branch-manager/admissions/${data?._id}`: `/branch-manager-viewer/admissions/${data?._id}` } scope="row" className={data?.isDisabled ? "px-4 py-3 font-medium text-red-600 whitespace-nowrap hover:underline underline-offset-2" : "px-4 py-3 font-medium text-gray-900 whitespace-nowrap hover:underline underline-offset-2"}>{data?.firstname} {data?.lastname}</Link></th>
                        <td className="px-6 py-4">{data?.username || "N/A"}</td>
                        <td className="px-6 py-4">{data?.grade}</td>
                        <td className="px-6 py-4">{data?.email}</td>
                        <td className="px-6 py-4">{data?.mobileNoPrimary}</td>
                        <td className="px-6 py-4 capitalize">{data?.gender}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ViewAdmissions
