import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const PagePagination = ({currentPage,totalpages,limit,setCurrentPage,setLimit} : any) => {
  return (
        <>
                    <nav>
                    <ul className="flex gap-1 text-xl justify-center w-full items-center -space-x-px h-12">
                        <button onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1) }} className='border h-full p-2'><IoIosArrowBack /></button>
                        {totalpages
                            .slice(currentPage > 2 ? currentPage - 3 : 0, currentPage + 2)
                            .map((page : number) => (
                                <li
                                    className={page === currentPage ? "bg-emerald-400 py-2 h-full px-4 border" : "py-2 h-full px-4 border"}
                                    onClick={() => setCurrentPage(page)}
                                    key={page}
                                >
                                    {page}
                                </li>
                            ))}
                        {currentPage + 2 < totalpages.slice(-1)[0] ?
                            (
                                <>
                                    <li className='py-2 h-full px-4 border' >...</li>
                                    {totalpages.slice(-1).map((page : number) => <li className='py-2 h-full px-4 border' onClick={() => setCurrentPage(page)} key={page} >{page}</li>)}
                                </>
                            ) : null
                        }
                        <button onClick={() => { if (currentPage < totalpages.slice(-1)[0]) setCurrentPage(currentPage + 1) }} className='border p-2 h-full'><IoIosArrowForward /></button>
                        <select defaultValue={limit} className='h-full bg-transparent border p-2 outline-none' onChange={(e : any) => setLimit(e.target.value)}>
                            {Array.from({length: 6 },(_,i) => (
                                    <option key={i} value={i + 5}>{i + 5}</option>
                            ))}
                        </select>
                    </ul>
                </nav>
        </>
   )
}

export default PagePagination