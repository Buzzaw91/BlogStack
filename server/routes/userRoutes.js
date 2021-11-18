const express = require('express')
const { getUsers, registerUsers, loginUser } = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

// ROUTES UNPROTECTED AT THE MOMENT
router.route('/').get(getUsers).post(registerUsers);

router.route('/login').post(loginUser);

module.exports = router