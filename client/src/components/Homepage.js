import React from 'react';

function Homepage() {
    return (
        <div class='container'>
            <h1>Welcome to PERN Starter</h1>
            <p>This is a simple project made with the PERN stack: Postrgres - Express - React - Node.</p>
            <p>Its goal is to set a starting point for future projects using this stack. This project includes Authentication with JWT, routing, hooks and context.</p>
            <p>Feel free to navigate and create an account to test this site. There's a hidden route for authenticated users!</p>
            <p>You can find the code on GitHub <a href="https://github.com/rampratts/pern-starter-boilerplate" target="_blank ">here</a></p>
        </div>
    )
}

export default Homepage;