const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('auth_token');

    if(!token) {
        res.status(403).send({'error': 'not authorized'});
    }
    
    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verifiedToken;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = auth;