import React, { useContext, useState } from 'react';
import { BiComment } from "react-icons/bi";
import { GiRoyalLove } from "react-icons/gi";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from "react-router-dom";
import { AuthUser } from '../Context/UserContext';
const PostCart = ({ posts, refetch }) => {

    const { user } = useContext(AuthUser)
    const [like, setLike] = useState(true)
    const [commentPostData, srtCommentPostData] = useState([])
    const { _id, postImg, postDetails, dataAdded, email, name, userPicture } = commentPostData;

    console.log(like);

    const heandelLike = (like, postid) => {

        fetch(`http://localhost:2100/posts/${postid}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ postid, like })
        }).then(re => {
            refetch()
        }).catch(error => console.log(error))
    }
    const heandelComment = (e) => {
        e.preventDefault()
        const form = e.target;
        const comment = form.text.value
        const commentData = {
            postID: _id,
            postDetails: {
                postImg, postDetails, postDate: dataAdded
            },
            postCreatotEmail: email,
            postCreatotdetails: {
                name, userPicture
            },
            commcentCreatorEmail: user.email,
            commcentCreatorData: {
                name: user?.displayName, picture: user?.photoURL
            },
            comment, commentDate: new Date(),
        }
        //
        fetch(`http://localhost:2100/comments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentData)
        }).then(re => {
            form.reset()
            console.log(re);
        })
            .catch(err => { console.log(err) })
    }


    return (
        <>
            {posts?.map(post =>
                <div key={post._id}>
                    <div className="bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-4 ">
                        <div className="flex  justify-between mx-2">
                            <div className="flex gap-3">
                                <div className="w-12 rounded-full overflow-hidden">
                                    <img className='' src={post?.userPicture} alt="" />
                                </div>
                                <div className="">
                                    <p> <span className='font-bold mr-2'>{post?.name} </span> create this post</p>
                                    <p className='text-sm text-gray-400'>{
                                        post.dataAdded.length > 12 ? post.dataAdded.slice(0, 10) : post.dataAdded.length
                                    }</p>
                                </div>
                            </div>
                            <Link to={`/media/${post._id}`}> <div className="pr-4 btn btn-sm">Details</div></Link>
                        </div>
                        <p className='mt-2 p-3'> {post?.postDetails}</p>
                        {post.postImg &&
                            <div className="rounded-md overflow-hidden mt-2">
                                <PhotoProvider>
                                    <PhotoView src={post?.postImg} >

                                        <img className=' object-cover  object-center w-full rounded shadow-lg h-96' src={post?.postImg} alt="" />
                                    </PhotoView>
                                </PhotoProvider>
                            </div>
                        }
                        <div className="my-3 mx-3 flex gap-5">
                            <div className="flex items-center gap-1">
                                <GiRoyalLove

                                    onClick={() => heandelLike(like, post._id)} />
                                <p>{post?.likes}</p>

                            </div>
                            <div className="flex items-center gap-1">
                                <BiComment />
                            </div>
                        </div>
                        {user?.uid ?
                            <form onSubmit={heandelComment}
                                className="px-3 flex gap-2 justify-center">
                                <div className="w-14 rounded-full overflow-hidden h-10">
                                    <img className='' src={user?.photoURL} alt="" />
                                </div>
                                <textarea name='text' className='border rounded-md w-full' placeholder='Leave A Comment'></textarea>
                                <button onClick={() => srtCommentPostData(post)} className='btn'>Commnet</button>
                            </form> :
                            <div className="text-red-300">Login got comment</div>
                        }

                    </div>
                </div>
            )
            }

        </>
    );
};

export default PostCart;