const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { check, body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const pool = require('../db/db');
const auth = require('../middleware/authentication');

router.post('/register',
    check('email').exists(),
    check('password').exists(),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const response = await pool.query('INSERT INTO users VALUES($1, $2, $3, $4)', [uuidv4(), username, email, hashedPassword]);
            res.send({results: "User created"});
        } catch (error) {
            res.send(error);
        }
})


router.post('/login',
    check('email').exists(),
    check('password').exists(), 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const user = await pool.query('SELECT id, username, email, password FROM users WHERE email = $1', [email]);
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
    
            if(!validPassword) {
                return res.status(400).send({'error': 'Invalid credentials'});
            }
            
            const jwtPayload = {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email,
            }

            const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET);

            res.send({token});
        } catch (error) {
            res.send(error)
        }

});

router.delete('/', auth, async (req, res) => {
    try {
        const response = await pool.query('DELETE FROM users WHERE id = $1', [req.user.id]);
        res.send({'result': 'User deleted'});
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;
