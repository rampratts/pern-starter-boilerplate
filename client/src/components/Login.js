import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [isLogged, setIsLogged] = useContext(UserContext);

    const loginUser = async (e) => {
        e.preventDefault();
        setShowError(false);
        const body = {
            email,
            password
        }
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })
        const result = await response.clone().json();

        if(result.token) {
            const { token } = await response.json();
            localStorage.setItem('auth_token', token);
            setIsLogged(true);
            history.push('/');
        } else {
            setShowError(true);
        }
    }

    return (
        <div class='container'>
            <form class='col-4'>
                <h1>Login page</h1>
                <p>Login to an existing account. <a href='#' onClick={() => history.push('/register')}>Don't have one?</a></p>
                <div class='form-group'>
                    <label for="email">Email address</label>
                    <input class='form-control' id='email' placeholder='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div class='form-group'>
                    <label for="passowrd">Password</label>
                    <input class='form-control' id='password' placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button class='btn btn-primary' onClick={loginUser}>Login</button>
                {showError ? (<p class='text-danger'>Invalid credentials</p>) : (<React.Fragment></React.Fragment>)}
            </form>
        </div>
    )
}

export default Login;