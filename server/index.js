const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postRoutes.js')
const imageRoutes = require('./routes/imageRoutes.js')


const app = express()
app.use(helmet())
app.use(cors())

app.use(express.json())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/images', imageRoutes)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

let buildPath

if (process.env.NODE_ENV === 'production') {
    buildPath = path.join(process.cwd(), 'client/build')

    app.use('/', express.static(buildPath), ((err)  => {
        console.error(err)
    }))

    app.get('/*', (req, res) => res.sendFile(path.join(buildPath, 'client/build/index.html'), function(err) {
        if (err) {
            res.status(500).json({error:err})
        }
    }))

} else {
    app.get('/api/v1/', (req, res) => {
        res.send('API is running...');
    });
}


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`))