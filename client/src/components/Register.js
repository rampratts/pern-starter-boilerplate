import React, { useState } from 'react';

function Register({history}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState({show: false, message: ''});

    const registerUser = async () => {
        setShowError({show: false, message: ''});

        if(!username) return setShowError({show: true, message: 'Invalid username'});
        if(!email) return setShowError({show: true, message: 'Invalid email'});
        if(!password || password.length < 6) return setShowError({show: true, message: 'Invalid password. It must be at least 6 characters long'});
    
        const body = {
            username,
            email,
            password
        }
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })
        const result = await response.clone().json();
        
        if(!result.errors) {
            if(result.code === "23505") return setShowError({show: true, message: 'User already exists'});
            history.push('/login');
        } else {
            if(result.errors[0].param === 'email') return setShowError({show: true, message: 'Invalid email format'});
        }
    }

    return (
        <div>
            <h1>Register page</h1>
            <p>Here you can register a new account (don't use your real data!)</p>
            <input placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
            <input placeholder='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={registerUser}>Register</button>
            {showError.show ? (<p>{showError.message}</p>) : (<React.Fragment></React.Fragment>)}
        </div>
    )
}

export default Register;