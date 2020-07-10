import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
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
        console.log(await response.json());
    }

    return (
        <div>
            <h1>Register page</h1>
            <p>Here you can register a new account (don't use your real data!)</p>
            <input placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
            <input placeholder='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={registerUser}>Register</button>
        </div>
    )
}

export default Register;