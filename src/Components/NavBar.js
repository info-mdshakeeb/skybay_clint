import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthUser } from '../Context/UserContext';


const NavBar = () => {
    const { user } = useContext(AuthUser)
    console.log(user);
    const navItem =
        <>
            <li><NavLink to='/Media'>Media</NavLink></li>
            <li><NavLink to='/Message'>Message</NavLink></li>
            <li><NavLink to='/About'>About</NavLink></li>
        </>

    return (
        <div className="shadow-lg ">
            <div className="navbar container md:px-14 mx-auto ">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl">SkYbAY</Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-center hidden lg:flex mr-3">
                        <ul className="menu menu-horizontal px-1">
                            {navItem}
                        </ul>
                    </div>
                    <label className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt='' src={user?.photoURL} />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default NavBar;