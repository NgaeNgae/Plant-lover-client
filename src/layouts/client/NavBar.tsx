import { useState } from 'react';
import {motion} from 'framer-motion';
import { AiOutlineClose, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import Login from '../../components/Login';
import { getAuthToken } from '../../services/TokenService';
import UserMenu from '../../components/UserMenu';
import { Link } from 'react-router-dom';
import LOGO from '../../assets/LOGO.png'
const NavBar = ({setSearchValue,handleSearch,showNav} :any) => {
  const isAuth = getAuthToken();
  const [openSearchBar,setOpenSearchBar] = useState<boolean>(false);
  const [openLoginForm,setOpenLoginForm] = useState<boolean>(false);
  return (
    <div>
    { openLoginForm && 
            <div className='bg-opacity-50 z-20 fixed top-0 bg-black w-screen h-screen'>
              <div className='flex fixed top-0 right-0 z-50 justify-center items-center bg-white'>
              {!isAuth ? 
              <Login open={openLoginForm} setOpen={setOpenLoginForm}/>
              : <UserMenu open={openLoginForm} setOpen={setOpenLoginForm}/>}
              </div>
            </div> 
    }
    {
      showNav &&
                 <nav className='flex z-10 bg-black bg-opacity-70 text-white fixed top-0 justify-between px-32 w-full mx-auto max-sm:px-5'>
                 <section className='w-1/3 flex'>
                    <img className='w-16' src={LOGO} alt="LOGO" />
                   <h1 className='text-2xl my-auto font-bold'>lant Lover</h1>
                </section>
                <section className='w-1/3 justify-evenly my-auto flex'>
                <Link className='text-xl' to="/">Home</Link>
                  <Link className='text-xl' to="/products">Product</Link>
                  <Link className='text-xl' to="/">About Us</Link>
                </section>
                 <section className='text-2xl my-auto justify-items-center w-1/3 justify-end flex gap-x-3'>
                 {openSearchBar ?
                           <form onSubmit={handleSearch} className='flex px-2 relative'>
                 <motion.input
                    onChange={(e) => setSearchValue(e.target.value)}
                   placeholder='Search'
                   transition={{ duration: "0.5" }}
                   initial={{ opacity:0,width:0 }}
                   animate={{ opacity:1,width:"100%" }}
                 className='h-6.5 bg-transparent w-full text-sm focus:outline-none border-b' type="text" />
                 <AiOutlineClose onClick={() => setOpenSearchBar(!openSearchBar)} className='transform text-sm absolute right-2 bottom-1 active:scale-90 transition-transform' />
                 </form>
                 : 
                 <AiOutlineSearch onClick={() => setOpenSearchBar(!openSearchBar)} className='transform active:scale-90 transition-transform' />
               }
                 <AiOutlineShoppingCart className='transform active:scale-90 transition-transform'/>
                 <AiOutlineUser onClick={() => setOpenLoginForm(!openLoginForm)} className='transform active:scale-90 transition-transform'/>
                 </section>
               </nav>
    }
    </div>
  )
}

export default NavBar