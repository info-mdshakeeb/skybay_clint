import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthUser } from '../../Context/UserContext';
import UpdateModule from './UpdateModule';

const About = () => {
    const { user, loading, setLoading } = useContext(AuthUser);
    const [moduleData, setModuleData] = useState(null)

    const url = `http://localhost:2100/user?email=${user.email}`
    const { data: useR = [], isLoading, refetch } = useQuery({
        queryKey: [''],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            setLoading(true)
            return data
        }
    })
    if (isLoading) {
        return <div className="">loading</div>
    }
    refetch()

    // console.log(useR.data[0]);
    return (
        <div className="flex  justify-center items-center py-5 h-min-screen h-screen">
            <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                    <div className=""></div>
                    <label
                        onClick={() => setModuleData(useR?.data[0])}
                        htmlFor="my-modal-3" className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">Edit</label>
                </div>
                <div className="mt-2">
                    <div className="card lg:card-side ">
                        <figure><img className='w-48  h-48' src={useR?.data[0]?.photoURL} alt="Album" /></figure>
                        <div className="card-body">
                            <span className="text-2xl font-bold text-gray-700 hover:text-gray-600  " >{useR?.data[0]?.displayName}</span>
                            <div className="lg:w-96">
                                <p className='py-3'>Email :{useR?.data[0]?.Email}</p>
                                <p className='pb-3'> University:{useR?.data[0]?.University}</p>
                                <p className='pb-3'>Address :{useR?.data[0]?.Address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {moduleData &&
                <UpdateModule
                    moduleData={moduleData}
                    setModuleData={setModuleData}
                    refetch={refetch}
                />
            }

        </div>

    );
};

export default About;