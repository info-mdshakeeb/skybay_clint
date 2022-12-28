import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthUser } from '../Context/UserContext';

const ProvateRoutes = ({ children }) => {

    const { user, loading } = useContext(AuthUser)
    const location = useLocation();

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
    return children
};

export default ProvateRoutes;