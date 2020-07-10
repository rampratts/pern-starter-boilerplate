import React from 'react';

function Secret() {
    return (
        <div>
            <h1>Psst, only authenticated users can see this 🤫</h1>
            <p>This is a secured route. Only users previously registered and logged in can access this.</p>
        </div>
    )
}

export default Secret;