import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthUser } from '../../Context/UserContext';

const MediaModal = ({ setModal, refetch }) => {
    const { user, setLoading } = useContext(AuthUser)
    // console.log(user);
    const imageBBapi = process.env.REACT_APP_imageBBapi;
    const [imgLoad, setImgLoad] = useState(false)
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        setLoading(true)
        setImgLoad(true)

        // console.log(data.email);
        const image = data.photo[0]
        const formData = new FormData();
        formData.append('image', image)
        const urL = `https://api.imgbb.com/1/upload?key=${imageBBapi}`
        fetch(urL, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(dataImage => {
                relaacePostData(dataImage.data.url)
            })
            .catch(error => {
                console.log(error.name, '-', error.message)
                setLoading(false)
                relaacePostData(null)
            })

        const relaacePostData = (imgUrl) => {
            console.log(imgUrl);
            const postdata = {
                name: user.displayName,
                email: user.email,
                userPicture: user.photoURL,
                postDetails: data.text,
                postImg: imgUrl,
                dataAdded: new Date()
            }
            fetch(`https://skybay-server.vercel.app/posts`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(postdata)
            }).then(re => {
                refetch()

                setModal(null)
                console.log(re);
            })
                .catch(err => {
                    setImgLoad(false)
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div className="mb-3">
                            <h2 className='text-center text-2xl font-bold'>Create post</h2>
                        </div>
                        <hr className='w-full' />
                        <div className="flex gap-2 py-4 items-center">
                            <div className="w-12 rounded-full overflow-hidden">
                                <img src={user?.photoURL} alt="" />
                            </div>
                            <h2 className='text-xl font-bold text-gray-700'>{user?.displayName}</h2>
                        </div>
                        <div className="my-4">
                            <textarea
                                type='text'
                                className='w-full'
                                placeholder="What's your maind ?"
                                {...register("text")}
                            >
                            </textarea>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. ...)</p>
                                </div>
                                <input id="dropzone-file" name='postPic' type="file" className="hidden"
                                    {...register("photo")} />
                            </label>
                        </div>
                        <button className='btn btn-primary w-full mt-3'>{imgLoad ? "loading.." : 'Post'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MediaModal;