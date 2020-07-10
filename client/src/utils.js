async function verifyAuthentication() {
    const response = await fetch('/api/users/verifyToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'auth_token': localStorage.getItem('auth_token')
        }
    })
    const { auth, username } = await response.json();
    return {
        auth: (auth === true ? true : false),
        username
    }
}

export { verifyAuthentication };