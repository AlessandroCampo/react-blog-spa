import { useEffect, useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import { GlobalStateContext } from "../GlobalState";
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


export default () => {

    const { state, setState } = useContext(GlobalStateContext);

    const fetchToken = async () => {
        console.log('fetched')
        try {
            const userData = {
                username: 'Aleks7',
                password: 'Pass123!'
            }
            const { data } = await axios.post(`${apiUrl}users/login`, userData);
            if (data) {
                localStorage.setItem('authTokenReact', data.token)
                setState((prevState) => ({
                    ...prevState,
                    user: data.user,
                    token: data.token,
                }));

            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchToken();
    }, [])


    return (
        <div className="flex">
            <Navbar className='fixed' />
            <div className="content-container w-full">
                <Outlet />
            </div>
        </div>
    );
};