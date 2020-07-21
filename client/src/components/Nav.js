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
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">PERN Starter</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" onClick={() => history.push('/')}>
                      <a class="nav-link" href="#">Home</a> 
                    </li>
                    {
                        isLogged ? (
                            <React.Fragment>
                                <li class="nav-item" onClick={() => history.push('/secret')}>
                                    <a class="nav-link" href="#">Secret</a> 
                                </li>
                                <li class="nav-item" onClick={logout}>
                                    <a class="nav-link">Logout</a> 
                                </li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li class="nav-item" onClick={() => history.push('/login')}>
                                    <a class="nav-link">Login</a> 
                                </li>
                                <li class="nav-item" onClick={() => history.push('/register')}>
                                    <a class="nav-link">Register</a> 
                                </li>
                            </React.Fragment>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Nav;