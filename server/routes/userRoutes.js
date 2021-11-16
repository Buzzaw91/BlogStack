const express = require('express')
const router = express.Router();
const { getUsers, registerUsers, authUser } = require('../controllers/userController.js')

router.route('/').get(getUsers).post(registerUsers);

router.route('/login').post(authUser);

module.exports = router