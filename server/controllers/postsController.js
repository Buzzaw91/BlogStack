const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const db = require('../db/index.js');
const { counter } = require('../utils/slugCounter')

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Private/Admin

const getAllPosts = asyncHandler( async (req, res) => {

    try {
        const { rows } = await db.query('SELECT * FROM posts;');

        return res.status(200).json({...rows})
    } catch(err) {
        console.error(err)
        res.status(400).json({error: err})
    }


})

// @desc    Create a post
// @route   POST /api/v1/posts
// @access  Private

const createPost = asyncHandler ( async (req, res) => {

    const { title, metaTitle, published, id, url, body } = req.body;
    let slug = slugify(title);
    slug = await counter(slug);

    const { rows } = await db.query(`INSERT INTO posts (slug, title, meta_title, published, url, user_id, body)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `,[slug, title, metaTitle, published, url, id, body]);
    if (rows[0]) {
        res.status(201).json({...rows[0]})
    } else {
        res.status(500).json({error: 'Something went wrong on the server...'})
    }


})

// @desc    Get all PUBLISHED post  by a user
// @route   GET /api/v1/posts/:id
// @access  Public

const getPostsByUser = asyncHandler( async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('SELECT * FROM posts WHERE user_id = $1 AND published = true', [id]);
        return res.status(200).json(rows);
    } catch(err) {
        console.log(err.stack);
        res.status(500).json({error: 'Something went wrong on the server...'})
    }


})

// @desc    Get single PUBLISHED post  by a user
// @route   GET /api/v1/posts/:id
// @access  Public

const getPostByUser = asyncHandler( async (req, res) => {
    const { slug } = req.params;

    try {
        const { rows } = await db.query('SELECT * FROM posts WHERE slug = $1', [slug]);
        return res.status(200).json(rows);
    } catch(err) {
        console.log(err.stack);
        res.status(500).json({error: 'Something went wrong on the server...'})
    }


})

module.exports = { getAllPosts, createPost, getPostsByUser, getPostByUser }