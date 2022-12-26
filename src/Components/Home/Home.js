import React, { useContext } from 'react';
import { AuthUser } from '../../Context/UserContext';

const Home = () => {
    const { user } = useContext(AuthUser)
    console.log(user);
    return (
        <div>
            home
        </div>
    );
};

export default Home;