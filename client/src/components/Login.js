import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [isLogged, setIsLogged] = useContext(UserContext);

    const loginUser = async () => {
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
        <div>
            <h1>Login page</h1>
            <p>Here you can login to your account</p>
            <input placeholder='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={loginUser}>Login</button>
            {showError ? (<p>Invalid credentials</p>) : (<React.Fragment></React.Fragment>)}
        </div>
    )
}

export default Login;