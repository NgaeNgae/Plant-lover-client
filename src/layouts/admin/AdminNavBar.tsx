import React, { useState } from 'react'
import { CiSearch, CiBellOn } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { AiOutlineComment, AiOutlineUser, AiOutlineDown } from 'react-icons/ai'
import { removeAuthToken } from '../../services/TokenService';
import { removeRole } from '../../services/RoleService';
export default function AdminNavbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setTimeout(() => {
            setIsDropdownOpen(false);
        }, 3000);
    }
    const LogOut = () => {
        removeRole();
        removeAuthToken();
        navigate('/');
    }
    return (
        <div className='w-full  sticky top-0 z-50 bg-white flex justify-between'>
            <div className='px-4 w-full justify-between flex items-center h-16 border-b'>
                <div className='relative'>
                    <input className='bg-transparent px-5 py-2 text-sm rounded-full border focus:outline-none' type="text" placeholder='Search' />
                    <CiSearch className='absolute top-2 text-gray-700 text-2xl right-4' />
                </div>
                <div onClick={toggleDropdown} className='flex justify-evenly w-1/5 text-2xl'>
                    <CiBellOn />
                    <AiOutlineComment />
                    <div className='flex'>
                        <AiOutlineUser className='rounded-full border-2 border-gray-900' />
                        <span className='text-sm my-auto mx-1'>Admin</span> <AiOutlineDown className='text-sm my-auto' />
                    </div>
                    {
                        isDropdownOpen && (
                            <div className='origin-top-right absolute right-0 top-16 transition mt-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
                                <button onClick={LogOut} className='mx-auto flex text-lg'>
                                    Log Out
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
