import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'
import axios from 'axios'

const ViewAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [searchAdmissions, setSearchAdmissions] = useState([]);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/admission/getAllAdmissions`)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message)
        } else {
          setSearchAdmissions(res.data.admissions)
          setAdmissions(res.data.admissions)
        }
      })
      .catch((err) => {
        alert(err.message)
      })
  }, []);

  const handleSearch = (e) => {
    if (e.target.value.length == 0) {
      setSearchAdmissions(admissions)
    }else{
      setSearchAdmissions(admissions.filter((data) => {
        return `${data.firstname} ${data.lastname}`.toLowerCase().includes(e?.target?.value?.toLowerCase()) || data?.gender?.toLowerCase()?.includes(e.target.value.toLowerCase()) || data?.email?.toLowerCase()?.includes(e.target.value.toLowerCase()) || data?.mobileNoPrimary?.toLowerCase()?.includes(e.target.value.toLowerCase()) || data?.grade?.toLowerCase()?.includes(e.target.value.toLowerCase()) 
      }))
    }
  }
  return (
    <div>
      <Navbar />
      <section className='w-screen min-h-screen p-10 px-20 Nunito'>
        <div className='w-full '>
          <Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
          <GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />
        </div>
        <div class="mx-auto">
          <div class="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-gray-500 dark:text-gray-400">
                <thead class="text-sm uppercase bg-darkPurple text-white">
                  <tr>
                    <th scope="col" class="px-6 py-5">Name</th>
                    <th scope="col" class="px-6 py-5">Grade</th>
                    <th scope="col" class="px-6 py-5">Email</th>
                    <th scope="col" class="px-6 py-5">Phone Number</th>
                    <th scope="col" class="px-6 py-5">Gender</th>
                  </tr>
                </thead>
                <tbody className='text-gray-700 mt-5'>
                  {
                    searchAdmissions?.map((data) => {
                      return <tr key={data?._id} class="border-b border-darkPurple">
                        <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{data?.firstname} {data?.lastname}</th>
                        <td class="px-6 py-4">{data?.grade}</td>
                        <td class="px-6 py-4">{data?.email}</td>
                        <td class="px-6 py-4">{data?.mobileNoPrimary}</td>
                        <td class="px-6 py-4 capitalize">{data?.gender}</td>
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
