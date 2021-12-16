const asyncHandler = require('express-async-handler')
const db = require('../db/index.js');
const generateToken = require('../utils/generateToken.js')
const bcrypt = require('bcryptjs')
const compareHash = require('../utils/comparePassword')
const toCamelCase = require('../utils/camelCaser')

// @desc    Login user & get token
// @route   POST /api/v1/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res)=> {
    const { username, password } = req.body;

    const { rows } = await db.query('SELECT * FROM users WHERE username = $1;', [username]);

    if (rows[0] && compareHash(password, rows[0].password_hash)) {
        rows[0].password_hash = null;
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
        VALUES ($1, $2, $3, $4, $5) RETURNING id ,username, bio, avatar, email, is_author, is_admin, last_login;
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
const getUserProfile = asyncHandler( async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        console.log(req.params)
        const { rows } = await db.query(`SELECT id, username, bio, avatar, email, is_author, is_admin, last_login, description, blog_name FROM users WHERE id = $1;`,
        [id])

        const result = toCamelCase(rows)

        return res.status(200).json(result[0])
    } catch(error) {
        console.error(error)
        return res.status(400).json({error})
    }

} )



// @desc    Get all users
// @route   GET /api/v1/users
// @access Private/admin
const getUsers = asyncHandler( async (req, res) => {
    const { rows } = await db.query(`SELECT id, username, email, bio, avatar, created_at, updated_at, status, is_author, is_admin, last_login FROM users;`);
    return res.json(rows);
});

// @desc    Get user & all published posts
// @route   GET /api/v1/users/:user
// @access Public
const getUserPosts = asyncHandler( async (req, res) => {
    try {
        const { username } = req.params;
        const { rows } = await db.query(`SELECT username, bio, avatar, email, last_login, title, slug, url, body FROM users
        INNER JOIN posts ON users.id = posts.user_id
        WHERE published = true AND username = $1
        ORDER BY posts.updated_at;`,[username])

        return res.status(200).json(rows)

    } catch(error) {
        console.error(error)
        return res.status(404).json({error})
    }
})

// @desc    Get featured users (at this point just arbitrary few, later based on likes on posts etc...)
// @route   GET /api/v1/users
// @access  Public
const getFeaturedUsers = asyncHandler( async (req, res) => {
    try {
        const { rows } = await db.query(`SELECT username, description, avatar, blog_name FROM users WHERE is_author = true LIMIT 5;`)
        return res.status(200).json(toCamelCase(rows))

    }   catch(error) {
        console.error(error)
        return res.status(404).json({error})
    }
})

module.exports = { getUsers, registerUsers, loginUser, getUserPosts, getFeaturedUsers, getUserProfile }
