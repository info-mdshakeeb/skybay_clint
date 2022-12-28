import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { BiHappyAlt, BiTrendingUp } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FcStackOfPhotos } from 'react-icons/fc';
import { FiLoader, FiLogOut } from "react-icons/fi";
import { RiLiveFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { AuthUser } from '../../Context/UserContext';
import PostCart from '../PostCart';
import MediaModal from './MediaModal';



const Media = () => {

    const { user, logOut } = useContext(AuthUser)
    const [modal, setModal] = useState(true)

    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await fetch('http://localhost:2100/posts')
            const data = res.json();
            return data
        }
    })
    const { data: likeposts = [] } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await fetch('http://localhost:2100/likeposts')
            const data = res.json();
            return data
        }
    })
    console.log(likeposts);

    if (isLoading) return <div className="">loading</div>
    return (
        <div className='min-h-screen container lg:px-28 m-auto '>
            <div className="pt-20"></div>
            <div className="md:flex gap-6 ">
                <div className="md:w-2/6 p-3 md:p-0">
                    <div className="bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-6 md:fixed md:w-60">
                        <h2 className='text-gray-400 mb-3'>NAVIGATION</h2>
                        <div
                            className="flex items-center mb-3 gap-3 cursor-pointer ">
                            <FaHome className='hover:scale-125 duration-200' />
                            <Link to='/'> <p className=' hover:scale-105 duration-200'>home</p></Link>

                        </div>
                        <div
                            className="flex items-center mb-3 gap-3 cursor-pointer ">
                            <BiTrendingUp className='hover:scale-125 duration-200' />
                            <a href="#TraindingPOst">  <p className=' hover:scale-105 duration-200'>trending</p></a>

                        </div>
                        <div
                            className="flex items-center mb-3 gap-3 cursor-pointer ">
                            <FiLoader className='hover:scale-125 duration-200' />
                            <a href="#RecentPOst"><p className=' hover:scale-105 duration-200'>Recent post</p></a>

                        </div>
                        <div
                            className="flex items-center mb-3 gap-3 cursor-pointer ">
                            <FiLogOut className='hover:scale-125 duration-200' />
                            {user ? <p onClick={logOut}
                                className=' hover:scale-105 duration-200'> SignOut</p> :
                                <Link to='/login'>Login</Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="grow md:w-2/6 p-3 md:p-0">
                    <div className="bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-4 ">
                        {user?.uid ?
                            <div className="">
                                <div className="flex gap-5 mb-3">
                                    <div className="w-12 rounded-full overflow-hidden">
                                        <img src={user?.photoURL} alt="" />
                                    </div>
                                    <label htmlFor="my-modal-3" className='grow py-3 border rounded-full' placeholder="">
                                        <p className='pl-3 text-gray-300'>What's your maind,{user?.displayName}?</p>
                                    </label>
                                </div>
                                <hr />
                                <div
                                    className="flex justify-around  "
                                    onClick={() => setModal(true)}>
                                    <div
                                        className="flex items-center mt-3 btn-sm btn btn-outline lg:gap-3 ">
                                        <RiLiveFill />
                                        <label
                                            htmlFor="my-modal-3" className=''>Live Vedio</label>
                                    </div>
                                    <div
                                        className="flex items-center mt-3 btn-sm btn btn-outline lg:gap-3 ">
                                        <FcStackOfPhotos />
                                        <label
                                            htmlFor="my-modal-3" className=''>Photos\Vedio</label>
                                    </div>
                                    <div
                                        className="flex items-center mt-3 btn-sm btn btn-outline lg:gap-3 ">
                                        <BiHappyAlt />
                                        <label
                                            htmlFor="my-modal-3" className=''>Felling/activites</label>
                                    </div>
                                </div>
                            </div> : <div className=''>Place login For give Status</div>}
                    </div>
                    <h2 id='RecentPOst' className='font-bold text-xl py-7'>Recent post :</h2>
                    <PostCart
                        refetch={refetch}
                        posts={posts.data}
                    />
                    <h2 id='TraindingPOst' className='font-bold text-xl py-7'>Trainding post :</h2>
                    <PostCart
                        refetch={refetch}
                        Tposts={likeposts.data}
                    />
                </div>
            </div>
            {modal &&
                <MediaModal
                    setModal={setModal}
                    refetch={refetch}
                    user={user} />
            }
        </div>
    );
};

export default Media;