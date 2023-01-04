import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthUser } from '../../Context/UserContext';
import AlartMessage from '../../Hooks/AlartMessage';

const UpdateModule = ({ setModuleData, moduleData, refetch }) => {
    const { successMessage, errorMessage } = AlartMessage()
    const { emailChange, user, updateUser } = useContext(AuthUser);
    // console.log(user);
    const { displayName, Email, Address, University, _id } = moduleData
    // console.log(_id);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const dataBaseUserUpdate = {
            displayName: data.name,
            Email: data.email,
            Address: data.address,
            University: data.university
        }
        const userInfo = {
            displayName: data.name,
        }
        // console.log(dataBaseUserUpdate);
        updateUser(userInfo)
            .then(rs => {
                emailChange(data.email)
                fetch(`https://skybay-server.vercel.app/user/${_id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ dataBaseUserUpdate })
                }).then(re => {
                    refetch()
                    setModuleData(null)
                    alert("Email change nMust reload")
                    successMessage('Update successFully')
                }).catch(error => console.log(error))
            })
            .catch(error => errorMessage(error.message))
    }
    // console.log(moduleData);
    refetch()
    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        onClick={() => setModuleData(null)}
                        htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" defaultValue={displayName} className="input input-bordered"
                                {...register("name", { required: 'Name must required' })}
                            />
                            {errors.name && <span className="label-text text-red-400">{errors?.name.message}</span>}
                        </div>

                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" defaultValue={Email} className="input input-bordered"
                                {...register("email", { required: 'Email must required' })}
                            />
                            {errors.email && <span className="label-text text-red-400">{errors?.email.message}</span>}
                        </div>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" defaultValue={Address} className="input input-bordered"
                                {...register("address", { required: 'Address must required' })}
                            />
                            {errors.address && <span className="label-text text-red-400">{errors?.address.message}</span>}
                        </div>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">university</span>
                            </label>
                            <input type="text" defaultValue={University} className="input input-bordered"
                                {...register("university", { required: 'university must required' })}
                            />
                            {errors.university && <span className="label-text text-red-400">{errors?.university.message}</span>}
                        </div>
                        <button className="btn btn-primary w-3/5 mt-3"> Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateModule;