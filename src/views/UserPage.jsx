import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import { Avatar } from "@mui/material";
import Post from "../components/PostComponents/Post";



export default () => {
    let { username } = useParams();
    console.log(username)
    const apiUrl = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState(undefined);
    const [postList, setPostList] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const postContainer = useRef(null);

    const fetchUserData = async () => {

        const token = localStorage.getItem('authTokenReact');
        if (!token) return

        const headers = {
            Authorization: `Bearer ${token}`
        };

        try {
            const { data } = await axios.get(`${apiUrl}users/${username}`, { headers })
            if (data) {
                console.log(data.user);
                setUser(data.user);
                setPostList([...data.user.posts])
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [username])


    return (
        <>
            <div className="user-page py-12 w-full  flex flex-col items-center">
                <div className="profile-wrapper  flex flex-col w-[535px] gap-6 bg-input py-8 rounded-xl  justify-between text-gray-400 p-6">
                    <div className="profie-upper flex justify-between max-x-full">
                        <Avatar
                            sx={{ bgcolor: '#DAA520', color: 'gray', width: 90, height: 90, border: '3px solid lightgray' }}
                            alt={user?.username}
                            src={user?.profilePic || ''}

                        />


                        <div className="user-infos flex flex-col gap-4 items-start justify-end w-2/3">
                            <div className="infos-upper flex items-center gap-6 w-full">
                                <div className="font-bold text-2xl text-gray-200">
                                    {username}
                                </div>

                                <div className="options flex items-center gap-2">                                    <button>
                                    Follow
                                </button>
                                    <button>
                                        Text **
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <div className="flex items-center gap-1">
                                    <strong>
                                        {user?.posts.length}
                                    </strong>
                                    <span>
                                        posts
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <strong>
                                        {user?.followers.length}
                                    </strong>
                                    <span>
                                        followers
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <strong>
                                        {user?.followers.length}
                                    </strong>
                                    <span>
                                        followed
                                    </span>
                                </div>

                            </div>
                            <p>
                                {user?.bio || 'Hey there, I am using BoolBoo'}
                            </p>
                        </div>


                    </div>
                </div>

                <div className="posts-container" ref={postContainer}>
                    {
                        postList.map((p, i) => {
                            return <Post
                                user={user}
                                key={p?.id || `post-${i}`}
                                post={{ ...p, user: user }}
                                setPostList={setPostList}


                            />
                        })

                    }

                </div>
            </div>

        </>
    )
}