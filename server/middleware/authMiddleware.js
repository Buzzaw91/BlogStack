const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const db = require('../db/index')


const protect = asyncHandler( async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const { rows } = await db.query(`SELECT id, username, is_author, is_admin FROM users WHERE id = $1;`, [decoded.id])
            req.user = rows[0];

        }   catch(err) {
            console.error(err);
            res.status(401).json({ error: 'Not authorized, token failed'})
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token'})
    }

    next();
})

module.exports = { protect }

