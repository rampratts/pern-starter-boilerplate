import React, { useState, createContext } from 'react';

export const UserContext = createContext('');

export const UserProvider = props => {
    const [isLogged, setIsLogged] = useState(false);

    return (
        <UserContext.Provider value={[isLogged, setIsLogged]}>
            {props.children}
        </UserContext.Provider>
    )
}