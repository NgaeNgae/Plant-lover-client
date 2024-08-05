import LOGO from '../../assets/LOGO.png';
import { BiSlider, BiSolidDashboard } from 'react-icons/bi'
import { GiPlantRoots } from 'react-icons/gi'
import { IoIosSettings } from 'react-icons/io'
import { NavLink,Link } from 'react-router-dom'
export default function AdminSidebar() {

    const items =
        [
            {
                route: "/admin/sliders",
                name: "Sliders",
                icon: <BiSlider />
            },
            {
                route: "/admin/products",
                name: "Products",
                icon: <GiPlantRoots />
            },
            {
                route: "/admin/settings",
                name: "Settings",
                icon: <IoIosSettings />
            },
        ]
    return (
        <>
            <Link to="/">
                <img className='h-16 mx-auto' src={LOGO} alt="LOGO" />
            </Link>
            <div>
            <NavLink className="flex w-full py-3" end to="/admin"><span className='mx-3'><BiSolidDashboard /></span>Dashboard</NavLink>
                {
                    items.map((item) => {
                        return (
                            <NavLink className="flex w-full py-3" key={item.name} to={item.route}><span className='mx-3'>{item.icon}</span>{item.name}</NavLink>
                        )
                    })
                }
            </div>
        </>
    )
}
