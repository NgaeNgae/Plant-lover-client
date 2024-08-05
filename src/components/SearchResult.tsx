import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const SearchResult = ({searchData,setSearchData} :any) => {
  return (
    <div  className="p-16 mt-16 bg-white">
        <button className='flex justify-end w-full text-3xl' onClick={() => setSearchData(null)}><AiOutlineClose/></button>
        {searchData.length !== 0 ? searchData.map((item:any) => {
            return (
                <div className=' bg-gray-100 my-5 p-10 w-full shadow-lg'>
                    <Link to={`/latest-products/${item._id}`}>
                    <h1 className=' underline text-emerald-400'>{item.name}</h1>
                    <p className='line-clamp-2 tracking-wide indent-7'>{item.description}</p>
                </Link>
                </div>
            )
        }) : <h1 className='text-4xl text-center tracking-widest font-bold'>Not Found Products</h1>}
    </div>
  )
}

export default SearchResult