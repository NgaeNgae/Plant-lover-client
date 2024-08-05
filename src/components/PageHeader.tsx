import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const PageHeader = ({totalCount,searchData,name,createPageLink} : any) => {
  return (
        <header className='flex justify-between py-4 mt-4 px-5 mx-4 border rounded-md'>
                <h3 className='my-auto'>Products : {totalCount}</h3>
                <div className='relative w-1/3'>
                    <input className='bg-transparent w-full px-5 py-1.5 text-sm rounded-md border focus:outline-none' onKeyDown={searchData} type="text" placeholder='Search' />
                    <CiSearch className='absolute top-1 text-gray-700 text-2xl right-3' />
                </div>
            <Link to={createPageLink} className='flex my-auto border text-emerald-400 font-medium border-emerald-400 px-3 rounded-md py-1'><AiOutlinePlus className='my-auto mr-2' />Add {name}</Link>
        </header>  )
}

export default PageHeader