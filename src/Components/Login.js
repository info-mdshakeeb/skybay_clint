import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthUser } from '../Context/UserContext';
import AlartMessage from '../Hooks/AlartMessage';

const Login = () => {
    const { loginEP, loginWithGoogle } = useContext(AuthUser)
    const { successMessage, errorMessage } = AlartMessage()
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        //login with email and passWord :
        loginEP(data.email, data.password)
            .then(rs => {
                successMessage('login SuccessFull')
                navigate(from, { replace: true })

            })
            .catch(err => errorMessage(err.message))
    }
    const heandelGoogleLogin = () => {
        loginWithGoogle()
            .then(re => {
                successMessage('Login SuccessFull')
                navigate(from, { replace: true })
            })
            .catch(error => { errorMessage(error) })
    }
    return (
        <div className="bg-base-200">
            <div className="">
                <div className="hero min-h-screen ">
                    <div className="hero-content  flex flex-col p-10 ">
                        <div className="text-left w-96 pl-3">
                            <p className='text-2xl'>Skybay Login</p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)}
                                className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" placeholder="email" className="input input-bordered"
                                        {...register("email", { required: 'Email must required' })}
                                    />
                                    {errors.email && <span className="label-text text-red-400">{errors?.email.message}</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                        {...register("password")}
                                    />
                                </div>
                                <div className="flex w-full">
                                    <button className="btn btn-primary w-3/5 mt-3">Login</button>
                                    <div className="divider divider-horizontal ">OR</div>
                                    <p className='flex justify-center items-center mt-3 btn-primary btn' onClick={heandelGoogleLogin}>G</p>
                                </div>
                            </form>
                        </div>
                        <div className="w-96 pl-3">
                            <p>Don't have an account? -
                                <Link className='text-yellow-400' to='/resister'>SignUp</Link>
                            </p><br />
                            <p>© SkyBay • Contact . Privacy & terms</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="hero-content  flex flex-col p-10 ">
                    <div className="text-left w-96 pl-3">
                        <p className='text-2xl'></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;