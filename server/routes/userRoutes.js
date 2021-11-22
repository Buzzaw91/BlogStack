const express = require('express')
const { getUsers, registerUsers, loginUser, getUserPosts, getFeaturedUsers } = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// ROUTES UNPROTECTED AT THE MOMENT
router.route('/').post(registerUsers)

router.route('/feat').get(getFeaturedUsers)

router.route('/:username').get(getUserPosts)

router.route('/login').post(loginUser)

module.exports = router