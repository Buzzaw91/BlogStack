const asyncHandler = require('express-async-handler')
const db = require('../db/index.js');
const generateToken = require('../utils/generateToken.js')
const bcrypt = require('bcryptjs')
const compareHash = require('../utils/comparePassword')

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
const authUser = asyncHandler( async (req, res)=> {
    const { username, password } = req.body;

    const { rows } = await db.query('SELECT * FROM users WHERE username = $1;', [username]);

    if (rows[0] && compareHash(password, rows[0].password_hash)) {
        return res.status(200).json({...rows[0], token: generateToken(rows[0].id)});
    }   else {
        return res.status(400).json({
            error: 'Invalid username of password'
        })
    }

})




// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public
const registerUsers = asyncHandler( async (req, res) => {
    const {
        username,
        password,
        bio,
        email,
        avatar
    } = req.body;

    const userExists = await db.query(`SELECT username, email FROM users WHERE username = $1 OR email = $2`, [username, email]);

    if (userExists.rowCount !== 0) {
        return res.status(400).json({
            error: 'Username or email already in use'
        })
    }   else {
        const hash = await bcrypt.hash(password, 10);
        const user = await db.query(`
        INSERT INTO users (username, bio, email, password_hash, avatar)
        VALUES ($1, $2, $3, $4, $5) RETURNING id ,username, bio, email, is_author, is_admin;
        `, [username, bio, email, hash, avatar]);

        if (user.rowCount !== 0) {
            const { rows } = user;
            return res.status(201).json({...rows[0], token: generateToken(rows[0].id)});
        } else {
            return res.status(400).json({
                error: 'Invalid user data'
            })
        }


    }


})

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access Private


// @desc    Get all users
// @route   GET /api/v1/users
// @access Private/admin
const getUsers = asyncHandler( async (req, res) => {
    const { rows } = await db.query('SELECT * FROM users;');
    res.json(rows);
});

module.exports = { getUsers, registerUsers, authUser }
