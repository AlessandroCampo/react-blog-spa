import './Navbar.css';
import logo from '../../assets/images/boolbook-favicon-color.png'
import { IoHome, IoHomeOutline, IoSearchOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { RiUserLine, RiUserFill } from 'react-icons/ri';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default ({ user }) => {
    return (

        <menu className='flex flex-col justify-between items-start h-screen py-8 ps-6'>
            <img src={logo} alt="logo" className='w-[58px]' />
            <div className="icons-container text-gray-400 flex flex-col gap-6 text-4xl items-center">
                <NavLink
                    to="/"
                >
                    <IoHomeOutline
                        className='navbar-icon'
                    />
                </NavLink>
                <NavLink>
                    <IoSearchOutline
                        className='navbar-icon'
                    />
                </NavLink>
                <NavLink>
                    <IoHeartOutline
                        className='navbar-icon'
                    />
                </NavLink>
                <NavLink
                    to={`/${user?.username}`}
                >
                    <RiUserLine
                        className='navbar-icon'

                    />
                </NavLink>




            </div>
            <div className="navbar-bottom text-white flex flex-col gap-2">
                <Avatar
                    sx={{ bgcolor: '#DAA520', color: 'gray', width: 36, height: 36 }}
                    alt={user?.username}
                    src={user?.profilePic || ''}

                />
            </div>
        </menu>


    )


};