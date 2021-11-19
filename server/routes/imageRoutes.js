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
    console.log(file)

    // Apply filter
    // Resize

    const result = await uploadFile(file)
    console.log('Before unlinkFile: ', result)
    await unlinkFile(file.path)
    console.log('After unlinkFile: ', result)

    const description = req.body.description
    console.log({imagePath: `/images/${result.Key}`})
    res.send({imagePath: `/images/${result.Key}`})
})

router.route('/:key').get((req, res) => {
    const key = req.params.key
    const readstream = getFileStream(key)

    readstream.pipe(res)
})

module.exports = router
