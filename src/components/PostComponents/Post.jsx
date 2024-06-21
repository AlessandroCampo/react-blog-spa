import { useState, useRef } from "react";
import Avatar from '@mui/material/Avatar';
import { FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa";
import './post.css';
import { formatTimestamp } from "../../utils";
import CustomizedMenus from "../Dropdown";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import axios from 'axios';


export default ({ user, post, setPostList }) => {

    const [editing, setEditing] = useState(false);
    const newContent = useRef('');
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(post)

    const editPost = async () => {

        const token = localStorage.getItem('authTokenReact');
        if (!token) return
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
            const data = {
                content: newContent.current.value
            }
            const response = await axios.put(`${apiUrl}posts/${post.slug}`, data, { headers });
            if (response) {

                setPostList(currList => currList.map(p => {
                    if (p.id === post.id) {
                        return { ...p, content: newContent.current.value }
                    }
                    return { ...p }
                }));
            }
        } catch (err) {
            console.error(err);
        }


        setEditing(false);
    }


    return (
        <div className="wrapper">
            <div className="upper">
                <div className="upper-left flex gap-3">
                    <Avatar
                        sx={{ bgcolor: '#DAA520', color: 'gray', width: 48, height: 48 }}
                        alt={post?.user?.username}
                        src={post.user?.avatar || ''}

                    />
                    <div className="authors-info flex flex-col text-sm">
                        <span className="font-bold">
                            {post?.user?.username}
                        </span>
                        <span>
                            {formatTimestamp(post?.createdAt)}
                        </span>
                    </div>
                </div>
                {
                    post?.userId === user.id && <CustomizedMenus setPostList={setPostList} setEditing={setEditing} post={post} />
                }

            </div>
            <div className="px-6">


                <TextareaAutosize
                    defaultValue={post?.content}
                    readOnly={!editing}
                    ref={newContent}
                    className={`${editing ? 'cursor-text border-2 border-white' : 'cursor-default border-0'} w-full max-h-[160px]`}
                >

                </TextareaAutosize>



            </div>
            {
                post.image &&
                <figure
                    className="w-full h-[150px]"
                >
                    <img
                        alt="post_image"
                        className="preview"
                        src={post.image}
                    />
                </figure>


            }
            <div className="lower">
                <div className="icons-container">
                    <div className="iconandcounter">
                        <FaRegHeart
                            className="icon-common"
                        />
                        <span className="counter">
                            {post?.likes.length || 0}
                        </span>
                    </div>
                    <div className="iconandcounter">
                        <FaRegComment
                            className="icon-common"
                        />
                        <span className="counter">
                            {post?.comments.length || 0}
                        </span>
                    </div>
                    <div className="iconandcounter">
                        <FaRetweet
                            className="icon-common"
                        />
                        <span className="counter">
                            {post?.comments.length || 0}
                        </span>
                    </div>
                </div>
                {
                    editing &&
                    <button onClick={editPost}>
                        Done
                    </button>
                }

            </div>
        </div>
    )
};