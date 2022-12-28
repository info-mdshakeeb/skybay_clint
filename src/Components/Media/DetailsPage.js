import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const DetailsPage = () => {
    const data = useLoaderData()
    const { id } = useParams()
    console.log(id);
    const { data: comments = [], isLoading, refetch } = useQuery({
        queryKey: ['commnet'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:2100/comments?postId=${id}`)
            const data = res.json();
            return data
        }
    })
    refetch()
    if (isLoading) return <div className="">loading</div>
    // console.log(comments.data)
    console.log(data)

    return (
        <div className='min-h-screen container lg:px-28 m-auto'>
            <div className="pt-20"></div>
            <div className="md:flex gap-6 ">
                <div className="md:w-2/6 p-3 md:p-0">
                    <div className="flex  justify-between mx-2">
                        <div className="">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img className='' src={data?.data[0]?.userPicture} alt="" />
                                </div>
                                <div className="">
                                    <p> <span className='font-bold mr-2'>{data?.data[0]?.name} </span> create this post</p>
                                    <p className='text-sm text-gray-400'>{
                                        data?.data[0]?.dataAdded.length > 12 ? data?.data[0]?.dataAdded.slice(0, 10) : data?.data[0]?.dataAdded.length
                                    }</p>
                                </div>
                            </div>
                            <p className='max-w-lx p-3'>{data?.data[0]?.postDetails}</p>
                        </div>

                    </div>
                    <div className="">
                        {data?.data[0]?.postImg && <figure className='p-4'>
                            <img className=' object-cover  object-center  rounded shadow-lg h-96 w-96' src={data?.data[0]?.postImg} alt="" />
                        </figure>}
                    </div>
                </div>
                <div className="grow md:w-2/6 p-3 md:p-24 ">
                    <span className="text-2xl font-bold text-gray-700 hover:text-gray-600 pt-6  ">Comments:</span>
                    <div className="mt-5">
                        {
                            comments?.data.map(comment =>
                                <div className="chat chat-start">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={comment.commcentCreatorData.picture} alt='/' />
                                        </div>
                                    </div>
                                    <div className="chat-bubble">{comment.comment}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>

        // <div className="flex  justify-center items-center py-5 h-min-screen h-screen">
        //     <div className="my-28"></div>
        //     <div className="max-w-4xl px-8 py-4 bg-white rounded-lg shadow-md">

        //         <div className="mt-2">
        //             <div className="card lg:card-side ">
        //                 <div className="">
        //                     {data?.data[0]?.postImg && <figure className='p-4'>
        //                         <img className=' object-cover  object-center  rounded shadow-lg h-96 w-96' src={data?.data[0]?.postImg} alt="" />
        //                     </figure>}
        //                 </div>
        //                 <div className="card-body ">
        //                     <span className="text-2xl font-bold text-gray-700 hover:text-gray-600   " >lo1l000 Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nostrum eius debitis inventore fugit aperiam nemo perferendis, vero et. Vero saepe ratione aperiam nemo perferendis, vero et. Vero saepe ratione enim commodi incidunt fugiat quibusdam iure placeat aliquamaperiam nemo perferendis, vero et. Vero saepe ratione enim commodi incidunt fugiat quibusdam iure placeat aliquamaperiam nemo perferendis, vero et. Vero saepe ratione enim commodi incidunt fugiat quibusdam iure placeat aliquam commodi incidunt fugiat quibusdam iure placeat aliquam.</span>
        //                     <div className="lg:w-96">
        //                         <p className='py-3'>{data?.data[0]?.postDetails}</p>
        //                         <span className="text-2xl font-bold text-gray-700 hover:text-gray-600  " >Comments</span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>


        // </div>
    );
};

export default DetailsPage;