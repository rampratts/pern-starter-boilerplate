import React, { useState } from 'react';

function Register({history}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState({show: false, message: ''});

    const registerUser = async (e) => {
        e.preventDefault();
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
        <div class='container'>
            <form class='col-4'>
                <h1>Register page</h1>
                <p>Here you can register a new account</p>
                <div class='form-group'>
                    <label for="username">Username</label>
                    <input class='form-control' id='username' placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div class='form-group'>
                    <label for="email">Email</label>
                    <input class='form-control' id='email' placeholder='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div class='form-group'>
                    <label for="password">Password</label>
                    <input class='form-control' placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button class='btn btn-success' onClick={registerUser}>Register</button>
                {showError.show ? (<p class='text-danger'>{showError.message}</p>) : (<React.Fragment></React.Fragment>)}
            </form>
        </div>
    )
}

export default Register;