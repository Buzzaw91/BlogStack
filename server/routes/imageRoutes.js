const express = require('express')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('../S3.js')


const router = express.Router()



router.route('/').post(upload.single('image'), async (req, res) => {
    const file = req.file

    // Apply filter
    // Resize

    const result = await uploadFile(file)
    await unlinkFile(file.path)

    const description = req.body.description
    console.log(result.Location)
    res.send(result.Location)
})

router.route('/:key').get((req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readstream = getFileStream(key)

    res.send(key)
})

module.exports = router
