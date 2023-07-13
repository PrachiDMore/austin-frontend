import React, { useRef } from 'react'
import useOnClickOutside from '../Utils/OnClickOutside';
import { Link } from 'react-router-dom';

const Dropdown = ({ setDropdown, dropdown, id, routes }) => {
	const dropdownRef = useRef()
	// useOnClickOutside(dropdownRef, () => { setDropdown(false) }, id)
	return (
		<button ref={dropdownRef} onClick={(e) => {
			setDropdown(dropdown === "" ? id : "")
		}} className='relative z-[100]'>
			<span className='navLink hover:text-darkPurple font-semibold'>{id}</span>
			<div id={id} className={dropdown === id ? 'min-w-[150px] origin-top-left flex flex-col px-2 py-2 w-max bg-white rounded-lg shadow-xl border absolute left-0' : 'hidden'}>
				{
					routes?.map((route) => {
						return <Link key={route?.path} className='rounded-lg hover:bg-darkPurple hover:bg-opacity-10 px-3 duration-150 py-2 navLink hover:text-darkPurple font-semibold' to={route?.path}>{route?.label}</Link>
					})
				}
			</div>
		</button>
	)
}

export default Dropdown
