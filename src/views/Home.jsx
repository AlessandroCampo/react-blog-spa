import { useEffect, useRef, useState, useContext } from "react";
import CreatePost from "../components/PostComponents/CreatePost.jsx"
import Post from "../components/PostComponents/Post";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { GlobalStateContext } from "../GlobalState.jsx";




const Home = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const { state } = useContext(GlobalStateContext);

    const [postList, setPostList] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const user = state.user;

    const postContainer = useRef(null);


    const fetchPosts = async (page = 1) => {
        const token = localStorage.getItem('authTokenReact');
        if (!token || page > totalPages) return

        try {

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const { data } = await axios.get(`${apiUrl}posts?page=${page}`, { headers });
            (data)
            if (data) {
                setPostList(oldList => [...data.allPosts]);
                setTotalPages(data.totalPages)
                console.log(data)
            }
        } catch (err) {
            console.error(err);
        }
    }

    //get Token
    useEffect(() => {
        console.log('home mounted', state)
        fetchPosts();
    }, [])



    useEffect(() => {
        const handleScroll = async () => {
            if (postContainer.current) {
                const scrollTop = document.documentElement.scrollTop;
                const windowHeight = window.innerHeight;
                const containerHeight = postContainer.current.offsetHeight;
                const containerTop = postContainer.current.offsetTop;
                const bottomOfViewport = scrollTop + windowHeight;
                const triggerPoint = containerTop + containerHeight * 0.9;

                if (bottomOfViewport >= triggerPoint) {
                    console.log('triggered')
                    const token = localStorage.getItem('authTokenReact');
                    setLastPage(prevPage => {
                        const nextPage = prevPage + 1;
                        fetchPosts(nextPage);
                        return nextPage;
                    })
                    return
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [postList]);

    const notifyError = (errorText) => {
        toast.error(errorText)
    }

    const notifySuccess = (text) => {
        toast.success(text)
    }

    return (
        <>

            <ToastContainer
                theme="dark"
                hideProgressBar
            />

            <div className="home-container overflow-auto">
                <div className="home-middle w-full flex items-center flex-col py-12">
                    <CreatePost
                        user={user}
                        setPostList={setPostList}
                        notifyError={notifyError}
                        notifySuccess={notifySuccess}
                        onPostCreate={(token) => { fetchPosts() }}
                    />
                    <div className="posts-container" ref={postContainer}>
                        {
                            postList.map((p, i) => {
                                return <Post
                                    user={user}
                                    key={p.id || `post-${i}`}
                                    post={p}
                                    setPostList={setPostList}


                                />
                            })

                        }

                    </div>
                </div>




            </div>

        </>
    )
}

export default Home;