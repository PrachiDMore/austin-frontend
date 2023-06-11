import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import extractToken from '../Utils/ExtractToken';
import Button from './Button';
import Logout from '../Utils/Logout';

const Navbar = () => {
    const ADMIN_ROUTES = [
        {
            label: "Home",
            path: "/",
        },
        {
            label: "Admission",
            path: "/admin/admissions"
        },
        {
            label: "Teachers",
            path: "/admin/teachers"
        },
        {
            label: "Subjects",
            path: "/admin/subjects"
        },
        {
            label: "Chapters",
            path: "/admin/chapters"
        },
        {
            label: "Courses",
            path: "/admin/courses"
        },
        {
            label: "Batches",
            path: "/admin/batches"
        },
        {
            label: "Branch",
            path: "/admin/branch"
        },
        {
            label: "Allocation",
            path: "/admin/chapter-allocation"
        },
        {
            label: "Roles",
            path: "/admin/roles"
        },
    ]
    const STUDENT_ROUTES = [
        {
            label: "Profile",
            path: "/student/profile",
        },
        {
            label: "Batch",
            path: "/student/batches",
        },
        {
            label: "Course",
            path: "/student/courses",
        },
        {
            label: "Chapters",
            path: "/student/chapters",
        },
    ];
    const [routes, setRoutes] = useState(extractToken()?.role === "student" ? STUDENT_ROUTES : ADMIN_ROUTES)
  return (
    <>
        <nav className='px-6 flex items-center h-24 w-screen shadow-md shadow-purpleShadow Nunito'>
            <div className='w-[10%] flex justify-center items-center'>
                <img className='w-48 h-auto' src="/assets/logo.jpg" alt="" />
            </div>
            <ul className='px-10 w-[70%] flex justify-start gap-x-10 items-center '>
                {
                    routes?.map((route) => {
                        return <Link className='navLink hover:text-darkPurple font-semibold' to={route.path}>{route.label}</Link>
                    })
                }
            </ul>
            <div className='w-[20%] flex justify-end items-center'>
                {!extractToken()?.role && <Link to='/signup' className='bg-darkPurple rounded-md text-sm font-bold text-white w-auto px-5 py-3 hover:bg-lightPurple duration-300'>Sign up</Link>}
                {extractToken()?.role && <Logout className={"w-max px-10"}/>}
            </div>
        </nav>
    </>
  )
}

export default Navbar