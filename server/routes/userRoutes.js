const express = require('express')
const router = express.Router();
const { getUsers, registerUsers, authUser } = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getUsers).post(registerUsers);

router.route('/login').post(authUser);

module.exports = router