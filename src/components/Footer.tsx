import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoReload, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLocationOutline, IoMailOpenOutline} from "react-icons/io5";
import { FaTelegram, FaViber } from "react-icons/fa6";
import LOGO from "../assets/LOGO.png"
import {CiPhone} from "react-icons/ci"
const Footer = () => {
  return (
    <>
        <div className='mx-10 grid-flow-col h-60 gap-x-5 grid grid-cols-3 grid-rows-11'>
            <div className='text-sm row-span-6'>
              <h1 className="text-lg">Customer Service</h1>
                <p className="my-3 flex items-center gap-2"><MdOutlinePrivacyTip/> Terms & Privacy Policy</p>
                <p className="flex items-center gap-2"><IoReload/> Return Policy</p>
            </div>
            <div className='row-span-5'>
            <h1 className="text-lg mb-3">Follow Us On</h1>
            <div className="flex gap-3 text-3xl">
            <a href="https://www.facebook.com/freeofadvice"><IoLogoFacebook/></a>
            <IoLogoInstagram/>
            <FaViber/>
            <FaTelegram/>
            <IoLogoTwitter/>
            </div>
            </div>
            <div className='row-span-11'>
            <h1 className="text-lg mb-3">Contus Us</h1>
                <p className="gap-2 my-3 items-start flex"><IoLocationOutline className="text-2xl"/>No.558/B,Anaw-ya-htar Road,Hlaing Thar Yar, Yangon</p>
                <p className="gap-2 my-3 items-start flex"><IoMailOpenOutline className="text-2xl"/>feduictservices@gmail.com</p>
                <p className="gap-2 items-start flex"><CiPhone className="text-2xl"/>09 42374 2964</p>
            </div>
            <img className="row-span-5 w-[20rem] mt-[-40px]" src={LOGO} alt="logo" />
        </div>
        <p className="text-center mb-5 text-xs">@ Copyright 2024 C by First ICT All rights reserved</p>
    </>
  )
}

export default Footer