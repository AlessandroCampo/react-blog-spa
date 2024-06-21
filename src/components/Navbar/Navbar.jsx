import './Navbar.css';
import logo from '../../assets/images/boolbook-favicon-color.png'
import { IoHome, IoHomeOutline, IoSearchOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { RiUserLine, RiUserFill } from 'react-icons/ri';
import { Avatar } from '@mui/material';


export default ({ user }) => {
    return (

        <menu className='flex flex-col justify-between items-start h-screen py-8 ps-6'>
            <img src={logo} alt="logo" className='w-[58px]' />
            <div className="icons-container text-gray-400 flex flex-col gap-6 text-4xl items-center">
                <IoHomeOutline
                    className='navbar-icon'
                />
                <IoSearchOutline
                    className='navbar-icon'
                />
                <IoHeartOutline
                    className='navbar-icon'
                />
                <RiUserLine
                    className='navbar-icon'
                />
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