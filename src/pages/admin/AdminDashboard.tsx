import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../layouts/admin/AdminNavBar'
import AdminSidebar from '../../layouts/admin/AdminSideBar'
export default function AdminDashboard() {
    return (
        <div className='flex'>
            <div className='w-1/6 h-[100vh] shadow-xl sticky top-0'>
                <AdminSidebar />
            </div>
            <div className='w-5/6'>
                <AdminNavbar />
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}
