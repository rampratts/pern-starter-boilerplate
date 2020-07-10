import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { verifyAuthentication } from '../utils';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const checkAuth = async () => {
        const { auth } = await verifyAuthentication();
        setIsAuth(auth);
        setIsLoaded(true);
    }

    useEffect(() => {
        checkAuth();
    }, []);

    if(!isLoaded){
        return (<h1>Loading</h1>)
    }else {
        return (
            <Route 
                {...rest}
                render={props => {
                    if(isAuth){
                        return <Component {...props} />
                    } else {
                        props.history.push("/login");
                    }
                }}
            />
        )
    }
}