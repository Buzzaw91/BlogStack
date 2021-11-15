const express = require('express')
const router = express.Router();
const { getUsers, registerUsers } = require('../controllers/userController.js')

router.route('/').get(getUsers).post(registerUsers);

module.exports = router