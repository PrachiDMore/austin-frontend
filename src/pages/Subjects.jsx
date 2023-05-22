import Input from '../components/Input'
import { GrSearch } from 'react-icons/gr'
import { UseSubjectContext } from '../context/Subjects'
import { useEffect, useState } from 'react'

const Subjects = () => {
    const { subjects } = UseSubjectContext()
    const [searchsubject,setSearchsubject]=useState([])
    
    useEffect(()=>{
        setSearchsubject(subjects);
    },[subjects])

    const handleSearch = (e) => {
        if (e.target.value.length == 0) {
            setSearchsubject(subjects)
        } else {
            setSearchsubject(subjects.filter((data) => {
                return `${data.name} ${data.grade}`.toLowerCase().includes(e?.target?.value?.toLowerCase())
            }))
        }
    }

    return (
        <>
            <section className='w-screen min-h-screen p-10 px-20 Nunito'>
                <div className='flex'>
                    <div className='w-[90%]'>
                        <Input onChange={handleSearch} type={'text'} placeholder={'Search...'} />
                        <GrSearch className='text-lg font-bold relative bottom-8 left-[97%]' />

                    </div>
                    <div className='ml-[10px]'>
                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white bg-lightPurple hover:bg-darkPurple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-darkPurple dark:hover:bg-lightPurple dark:focus:ring-lightPurple" type="button" onClick={() => {
                        }}>
                            Add Subject
                        </button>
                    </div>
                </div>
                <div class="mx-auto">
                    <div class="bg-white relative shadow-md shadow-purpleShadow rounded-lg overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-sm uppercase bg-darkPurple text-white">
                                    <tr>
                                        <th scope="col" class="px-6 py-5">Subject Name</th>
                                        <th scope="col" class="px-6 py-5">Grade</th>
                                        <th scope="col" class="px-6 py-5">ID</th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-700 mt-5'>
                                    {
                                        searchsubject.map((Subject) => {
                                            return (
                                                <tr key={Subject._id} class="border-b border-darkPurple">
                                                    <td class="px-6 py-4">{Subject.name}</td>
                                                    <td class="px-6 py-4">{Subject.grade}</td>
                                                    <td class="px-6 py-4">{Subject._id}</td>
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
export default Subjects;