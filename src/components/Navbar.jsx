import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import extractToken from '../Utils/ExtractToken';
import Button from './Button';
import Logout from '../Utils/Logout';
import useOnClickOutside from '../Utils/OnClickOutside';
import Dropdown from './Dropdown';

const Navbar = () => {
    const dropdownRef = useRef(null)
    const ADMIN_ROUTES = [
        {
            label: "Home",
            path: "/",
        },
        {
            label: "Admission",
            path: "/admin/admissions",
            dropdown: ""
        },
        {
            label: "Teachers",
            path: "/admin/teachers",
            dropdown: ""
        },
        {
            label: "Subjects",
            path: "/admin/subjects",
            dropdown: ""
        },
        {
            label: "Chapters",
            path: "/admin/chapters",
            dropdown: ""
        },
        {
            label: "Courses",
            path: "/admin/courses",
            dropdown: ""
        },
        {
            label: "Batches",
            path: "/admin/batches",
            dropdown: "Batch"
        },
        {
            label: "Batches",
            path: "/admin/individual-batches",
            dropdown: "Batch"
        },
        {
            label: "Branch",
            path: "/admin/branch",
            dropdown: ""
        },
        {
            label: "Allocation",
            path: "/admin/chapter-allocation",
            dropdown: "Chapter Allocation"
        },
        {
            label: "Allocation",
            path: "/admin/individual-chapter-allocation",
            dropdown: "Chapter Allocation"
        },
        {
            label: "Manager",
            path: "/admin/branch-manager",
            dropdown: ""
        },
        {
            label: "Attendance",
            path: "/admin/attendance",
            dropdown: "Attendance"
        },
        {
            label: "Attendance",
            path: "/admin/attendance",
            dropdown: "Attendance"
        },
    ]
    const STUDENT_ROUTES = [
        {
            label: "Profile",
            path: "/student/profile",
            dropdown: ""
        },
        {
            label: "Batch",
            path: "/student/batches",
            dropdown: ""
        },
        // {
        //     label: "Course",
        //     path: "/student/courses",
        // },
        {
            label: "Chapters",
            path: "/student/chapters",
            dropdown: ""
        },
    ];
    const TEACHER_ROUTES = [
        {
            label: "Profile",
            path: "/teacher/profile",
            dropdown: ""
        },
        {
            label: "Batch",
            path: "/teacher/batches",
            dropdown: ""
        },
        {
            label: "Course",
            path: "/teacher/courses",
            dropdown: ""
        },
        {
            label: "Chapters",
            path: "/teacher/chapters",
            dropdown: ""
        },
        {
            label: "Attendance",
            path: "/teacher/attendance",
            dropdown: ""
        },
    ]
    const BRANCH_MANAGER_ROUTES = [
        {
            label: "Profile",
            path: "/branch-manager/profile",
            dropdown: ""
        },
        {
            label: "Admission",
            path: "/branch-manager/admissions",
            dropdown: ""
        },
        {
            label: "Teachers",
            path: "/branch-manager/teachers",
            dropdown: ""
        },
        {
            label: "Subjects",
            path: "/branch-manager/subjects",
            dropdown: ""
        },
        {
            label: "Chapters",
            path: "/branch-manager/chapters",
            dropdown: ""
        },
        {
            label: "Courses",
            path: "/branch-manager/courses",
            dropdown: ""
        },
        {
            label: "Batches",
            path: "/branch-manager/batches",
            dropdown: ""
        },
        {
            label: "Allocation",
            path: "/branch-manager/chapter-allocation",
            dropdown: ""
        },
        {
            label: "Attendance",
            path: "/branch-manager/attendance",
            dropdown: ""
        },
    ]
    const [routes, setRoutes] = useState(extractToken()?.role === `${process.env.REACT_APP_STUDENT_ROLE}` ? STUDENT_ROUTES : extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}` ? ADMIN_ROUTES : extractToken()?.role === `${process.env.REACT_APP_BRANCH_MANAGER_ROLE}` ? BRANCH_MANAGER_ROUTES : TEACHER_ROUTES)
    const [dropdown, setDropdown] = useState('');

    return (
        <>
            <nav className={extractToken()?.role ? 'px-6 flex items-center h-24 w-screen shadow-md shadow-purpleShadow Nunito' : 'px-6 flex items-center justify-between h-24 w-screen shadow-md shadow-purpleShadow Nunito'}>
                <div className='w-[10%] flex justify-center items-center'>
                    <img className='w-48 h-auto' src="/assets/logo.jpg" alt="" />
                </div>
                {extractToken()?.role === `${process.env.REACT_APP_ADMIN_ROLE}` && <ul className='px-10 w-[70%] flex justify-start gap-x-10 items-center '>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/admin/admissions"}>{"Admission"}</Link>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/admin/teachers"}>{"Teachers"}</Link>
                    {/* <Link className='navLink hover:text-darkPurple font-semibold' to={"/admin/subjects"}>{"Subjects"}</Link>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/admin/chapters"}>{"Chapters"}</Link>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/admin/courses"}>{"Courses"}</Link> */}
                    <Dropdown id={"Course"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Subjects",
                            path: "/admin/subjects",
                        },
                        {
                            label: "Chapters",
                            path: "/admin/chapters",
                        },
                        {
                            label: " Courses",
                            path: "/admin/courses",
                        }
                    ]} />
                    <Dropdown id={"Batch"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Batches",
                            path: "/admin/batches",
                        },
                        {
                            label: "Individual Batches",
                            path: "/admin/individual-batches",
                        }
                    ]} />
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/admin/branch"}>{"Branch"}</Link>
                    <Dropdown id={"Allocation"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Batch Allocation",
                            path: "/admin/chapter-allocation",
                        },
                        {
                            label: "Individual Batch Allocation",
                            path: "/admin/individual-chapter-allocation",
                        }
                    ]} />
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/admin/branch-manager"}>{"Manager"}</Link>
                    <Dropdown id={"Attendance"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Batch Attendance",
                            path: "/admin/attendance",
                        },
                        {
                            label: "Individual Batch Attendance",
                            path: "/admin/individual-attendance",
                        }
                    ]} />
                </ul>}
                {extractToken()?.role === `${process.env.REACT_APP_BRANCH_MANAGER_ROLE}` && <ul className='px-10 w-[70%] flex justify-start gap-x-10 items-center '>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/branch-manager/admissions"}>{"Admission"}</Link>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/branch-manager/teachers"}>{"Teachers"}</Link>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/branch-manager/subjects"}>{"Subjects"}</Link>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/branch-manager/chapters"}>{"Chapters"}</Link>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/branch-manager/courses"}>{"Courses"}</Link>
                    <Dropdown id={"Batch"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Batches",
                            path: "/branch-manager/batches",
                        },
                        {
                            label: "Individual Batches",
                            path: "/branch-manager/individual-batches",
                        }
                    ]} />
                    <Dropdown id={"Allocation"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Batch Allocation",
                            path: "/branch-manager/chapter-allocation",
                        },
                        {
                            label: "Individual Batch Allocation",
                            path: "/branch-manager/individual-chapter-allocation",
                        }
                    ]} />
                    <Dropdown id={"Attendance"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Batch Attendance",
                            path: "/branch-manager/attendance",
                        },
                        {
                            label: "Individual Batch Attendance",
                            path: "/branch-manager/individual-attendance",
                        }
                    ]} />
                </ul>}
                {extractToken()?.role === `${process.env.REACT_APP_TEACHER_ROLE}` && <ul className='px-10 w-[70%] flex justify-start gap-x-10 items-center '>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/teacher/profile"}>{"Profile"}</Link>
                    <Dropdown id={"Batch"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Batches",
                            path: "/teacher/batches",
                        },
                        {
                            label: "Individual Batches",
                            path: "/teacher/individual-batches",
                        }
                    ]} />
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/teacher/courses"}>{"Course"}</Link>
                    <Dropdown id={"Chapters"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Chapter Allocation",
                            path: "/teacher/chapters",
                        },
                        {
                            label: "Individual Chapter Allocation",
                            path: "/teacher/individual-chapters",
                        }
                    ]} />
                    <Dropdown id={"Attendance"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Batch Attendance",
                            path: "/teacher/attendance",
                        },
                        {
                            label: "Individual Batch Attendance",
                            path: "/teacher/individual-attendance",
                        }
                    ]} />
                </ul>}
                {extractToken()?.role === `${process.env.REACT_APP_STUDENT_ROLE}` && <ul className='px-10 w-[70%] flex justify-start gap-x-10 items-center '>
                    <Link className='navLink hover:text-darkPurple font-semibold' to={"/student/profile"}>{"Profile"}</Link>
                    <Dropdown id={"Batch"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Batch",
                            path: "/student/batches",
                        },
                        {
                            label: "Individual Batch",
                            path: "/student/individual-batches",
                        }
                    ]} />
                    <Dropdown id={"Chapter"} setDropdown={setDropdown} dropdown={dropdown} routes={[
                        {
                            label: "Regular Batch Chapter",
                            path: "/student/chapters",
                        },
                        {
                            label: "Individual Batch Chapters",
                            path: "/student/individual-chapters",
                        }
                    ]} />
                </ul>}
                <div className='w-[20%] flex justify-end items-center'>
                    {!extractToken()?.role && <Link to='/signin' className='bg-darkPurple rounded-md text-sm font-bold text-white w-auto px-5 py-3 hover:bg-lightPurple duration-300'>Sign In</Link>}
                    {extractToken()?.role && <Logout className={"w-max px-10"} />}
                </div>
            </nav>
        </>
    )
}

export default Navbar