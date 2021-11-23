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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
} else {
    app.get('/api/v1/', (req, res) => {
        res.send('API is running...');
    });
}



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`))