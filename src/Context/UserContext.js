import React, { createContext, useState } from 'react';

export const AuthUser = createContext()

const UserContext = ({ children }) => {
    const [user, setUser] = useState('skb')

    const authInfo = { user, setUser }
    return (
        <AuthUser.Provider value={authInfo}>
            {children}
        </AuthUser.Provider>
    );
};

export default UserContext;