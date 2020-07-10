import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext';


function Nav() {
    const [isLogged, setIsLogged] = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('auth_token');
        history.push('/');
        setIsLogged(false);
    }

    return (
        <div>
            <ul>
                <li onClick={() => history.push('/')}>Home</li>
                {
                    isLogged ? (
                        <React.Fragment>
                            <li onClick={() => history.push('/secret')}>Secret</li>
                            <li onClick={logout}>Logout</li>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <li onClick={() => history.push('/login')}>Login</li>
                            <li onClick={() => history.push('/register')}>Register</li>
                        </React.Fragment>
                    )
                }
            </ul>
        </div>
    )
}

export default Nav;