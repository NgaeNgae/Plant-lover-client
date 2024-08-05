import { ChangeEvent, FormEvent, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {authActionCreator} from '../stores/actionCreator';
import {motion} from 'framer-motion';
interface PropsType {
    open : boolean
    setOpen : Function
}
const Login = ({open,setOpen} : PropsType) => {
    let dispath = useDispatch();
    let err = useSelector((state : any) => {
        if(state.auth.error) {
           return state.auth.error;
        }
    });
    let {Login} = bindActionCreators(authActionCreator, dispath)
    let [data,setData] = useState<any>();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        Login(data);
    }
    const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setData({...data, [name]: value});
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 text-sm font-bold h-screen rounded-lg backdrop-blur-sm">
                <div>
                <motion.button
                className='float-end'
                whileHover={{ 
                    rotate: "180deg",
                    transition: { duration: 1,type: "spring"},
                }}
                ><AiOutlineClose onClick={() => setOpen(!open)} className='transform text-2xl active:scale-90 transition-transform' /></motion.button>
                    <h1 className='text-emerald-400 font-extrabold text-2xl'>Login</h1>
                </div>
                    <div>
                        <label className='block text-emerald-400 mb-2' htmlFor="name">Your Email</label>
                        <input name='email' onChange={handleInputChange} type="text" className='text-gray-600 border placeholder:text-xs w-full p-3 focus:outline-none rounded' placeholder='Email Address' />
                        <p>{err}</p>
                    </div>
                    <div>
                        <label className='block mb-2 text-emerald-400' htmlFor="name">Password</label>
                        <input name='password' onChange={handleInputChange} type="text" className='text-gray-600 border placeholder:font-xs w-full p-3 focus:outline-none rounded' placeholder='**********' />
                    </div>
                    <Link to="/" className='text-emerald-400 underline-offset-4 underline text-center' >forgot password?</Link>
                    <button className='w-full my-3 text-gray-50 bg-emerald-400 py-2'>Sing In</button>
                    <Link className='tracking-wider text-emerald-400 mx-auto' to="/register">New to Our Website? Sign Up here</Link>
                </form>
        </>
    )
}

export default Login
