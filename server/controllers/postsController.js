const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const db = require('../db/index.js');

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
    const counter = await db.query(`INSERT INTO counters (slug, counter) VALUES ($1, 0)
    ON CONFLICT (slug)
    DO UPDATE SET counter = counters.counter + 1 RETURNING counter;
    `,[slug]);
    counter.rows[0].counter > 0 ? slug = slug.concat('-', counter.rows[0].counter): null;

    const { rows } = await db.query(`INSERT INTO posts (slug, title, meta_title, published, url, user_id, body)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `,[slug, title, metaTitle, published, url, id, body]);
    if (rows[0]) {
        res.status(201).json({...rows[0]})
    } else {
        res.status(500).json({error: 'Something went wrong on the server...'})
    }


})

module.exports = { getAllPosts, createPost }