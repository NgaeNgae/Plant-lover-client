import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {motion} from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { removeRole } from '../services/RoleService'
import { removeAuthToken } from '../services/TokenService'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import {userActionCreator } from '../stores/actionCreator'
interface PropsType {
    open : boolean
    setOpen : Function
}
const UserMenu = ({open,setOpen} : PropsType) => {
    const dispatch = useDispatch();
    const {user,loading} = useSelector((state : any) => state.user);
    let {fetchUser} = bindActionCreators(userActionCreator, dispatch)
    const navigate = useNavigate();
    useEffect(() => {
        fetchUser();
    },[])
    const LogOut = () => {
        removeRole();
        removeAuthToken();
        navigate('/');
    }
  return (
    <>
        {!loading ? <div className='flex flex-col w-80 gap-2 p-10 text-sm font-bold h-screen rounded-lg backdrop-blur-sm'>
        <div className='mb-5'>
                <motion.button
                className='float-end'
                whileHover={{ 
                    rotate: "180deg",
                    transition: { duration: 1,type: "spring"},
                }}
                ><AiOutlineClose onClick={() => setOpen(!open)} className='transform text-2xl active:scale-90 transition-transform' /></motion.button>
                    <h1 className='text-emerald-400 font-extrabold text-2xl'>Hi,{user?.name}</h1>
        </div>
        <Link className='border-b-2 py-2' to={"/"}>Accout Detail</Link>
        <Link className='border-b-2 py-2'to={"/"}>Address</Link>
        <Link className='border-b-2 py-2'to={"/"}>Reset Password</Link>
        <div className='border-b-2 py-2 cursor-pointer' onClick={LogOut}>Logout</div>
        </div>
         : <h1>loading...</h1>
        }
    </>
  )
}

export default UserMenu