import React, { useContext } from 'react';
import { BiComment } from "react-icons/bi";
import { GiSelfLove } from "react-icons/gi";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { AuthUser } from '../Context/UserContext';

const PostCart = ({ posts }) => {
    const { user } = useContext(AuthUser)
    console.log(posts);
    return (
        <>
            {posts?.map(post =>
                <div key={post._id}>
                    <div className="bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-4 ">
                        <div className="flex  justify-between mx-2">
                            <div className="flex gap-3">
                                <div className="w-12 rounded-full overflow-hidden">
                                    <img className='' src={post?.creatorData
                                        ?.picture} alt="" />
                                    {/* {console.log(post)} */}
                                </div>
                                <div className="">
                                    <p> <span className='font-bold mr-2'>{post?.creatorData?.name} </span> create this post</p>
                                    <p className='text-sm text-gray-400'>{
                                        post.dataAdded.length > 12 ? post.dataAdded.slice(0, 10) : post.dataAdded.length


                                    }</p>
                                </div>
                            </div>
                            <div className="pr-4 btn btn-ghost">Details</div>
                        </div>
                        <p className='mt-2 p-3'> {post.postDetails}</p>
                        {post.postImg &&
                            <div className="rounded-md overflow-hidden mt-2">
                                <PhotoProvider>
                                    <PhotoView src={post.postImg} >
                                        <img className=' object-cover  object-center w-full rounded shadow-lg h-96' src={post.postImg} alt="" />
                                    </PhotoView>
                                </PhotoProvider>

                            </div>

                        }
                        <div className="my-3 mx-3 flex gap-5">
                            <div className="flex items-center gap-1">
                                <GiSelfLove />
                                <p>10</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <BiComment />
                                <p>10</p>
                            </div>
                        </div>
                        <div className="px-3 flex gap-2 justify-center">
                            <div className="w-14 rounded-full overflow-hidden h-10">
                                <img className='' src={user.photoURL} alt="" />
                            </div>
                            <textarea className='border rounded-md w-full' placeholder='Leave A Comment'></textarea>
                            <button className='btn'>Commnet</button>

                        </div>

                    </div>
                </div>
            )
            }

        </>
    );
};

export default PostCart;