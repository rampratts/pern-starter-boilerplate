import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext';


function Secret() {
    const [isLogged, setIsLogged] = useContext(UserContext);
    const history = useHistory();

    const deleteAccount = async () => {
        const response = await fetch('/api/users', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'auth_token': localStorage.getItem('auth_token')
            }
        })
        const { result } = await response.clone().json();

        if(result) {
            localStorage.removeItem('auth_token');
            history.push('/');
            setIsLogged(false);
        }
    }
    
    return (
        <div class='container'>
            <h1>Psst, only authenticated users can see this 🤫</h1>
            <p>This is a secured route. Only users previously registered and logged in can access this.</p>
            <p>Also, feel free to delete your data!</p>
            <button class='btn btn-danger' onClick={deleteAccount}>Delete my account</button>
        </div>
    )
}

export default Secret;