import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import NavBar from '../Components/NavBar';

const Main = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;