const asyncHandler = require('express-async-handler')
const db = require('../db/index.js');
const generateToken = require('../utils/generateToken.js')

// @desc    Get all users
// @route   GET /api/v1/users
// @access Private/admin
const getUsers = asyncHandler( async(req, res) => {
    const { rows } = await db.query('SELECT * FROM users;');
    res.json(rows);
});

module.exports = { getUsers }
