import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import image from '../../assets/authBackgroundImage.jpg'
import {authActionCreator} from '../../stores/actionCreator';

const Register:React.FC = () => {
    const dispath = useDispatch();
    const navigate = useNavigate();
    let err = useSelector((state : any) => {
        if(state.auth.error) {
           return state.auth.error;
        }
    });
    let {Register} = bindActionCreators(authActionCreator, dispath)
    let [data,setData] = useState<any>();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        Register(data);
    }
    const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setData({...data, [name]: value});
    };
    return (
        <>
             <div className='h-screen flex justify-center items-center' style={{ backgroundImage: `url(${image})` }}>
            <form onSubmit={handleSubmit} className="w-[30%] p-10 text-sm font-bold border-2 rounded-lg backdrop-blur-sm">
                    <h1 className='text-emerald-500 font-extrabold text-4xl'>Register</h1>
                    <div className='my-5'>
                        <label className='block text-emerald-400 mb-1'>Your Name </label>
                        <input name='name' onChange={handleInputChange} type="text" className='placeholder:text-xs w-full py-2 focus:outline-none rounded px-3 text-sm' placeholder='Full Name' />
                    </div>
                    <div className='my-5'>
                        <label className='block text-emerald-400 mb-1'>Your Email</label>
                        <input name='email' onChange={handleInputChange} type="text" className='placeholder:text-xs w-full py-2 focus:outline-none rounded px-3 text-sm' placeholder='Email Address' />
                    </div>
                    <div className='my-5'>
                        <label className='block mb-1 text-emerald-400'>Password</label>
                        <input name='password' onChange={handleInputChange} type="password" className='placeholder:font-xs w-full py-2 focus:outline-none rounded px-3 text-sm' placeholder='**********' />
                    </div>
                    <div className='mt-5'>
                        <label className='block mb-1 text-emerald-400'>Password Comfirmation</label>
                        <input name='password_confirmation' onChange={handleInputChange} type="password" className='placeholder:font-xs w-full py-2 focus:outline-none rounded px-3 text-sm' placeholder='**********' />
                    </div>
                    <div className='relative'>
                    <button type="submit" className='w-full border-emerald-500 border-2 shadow relative mt-10 text-emerald-800 font-bold bg-emerald-400 py-2'>Sing Up</button>
                    <div onClick={() => navigate(-1)} className='w-full cursor-pointer text-center border-emerald-500 border-2 shadow relative mt-2 text-emerald-800 font-bold bg-emerald-400 py-2'>Back</div>
                    {err && <p className='text-red-500 absolute top-0 my-2.5 text-center w-full'>{err}</p>}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
