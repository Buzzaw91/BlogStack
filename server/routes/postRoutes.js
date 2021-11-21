const express = require('express')
const { getAllPosts, createPost, getPostsByUser, getPostByUser } = require('../controllers/postsController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(getAllPosts).post(protect, createPost);

router.route('/:id').get(getPostsByUser)

router.route('/single/:slug').get(getPostByUser)


module.exports = router