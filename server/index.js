const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postRoutes.js')
const imageRoutes = require('./routes/imageRoutes.js')
const { resolve } = require('path')







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
    app.use(express.static(path.join(process.cwd(), '/client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(process.cwd() ,'/app', '/client' , '/build','index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}
// console.log(`path.relative(__dirname, '/app/build/index.html')`, path.relative(__dirname, '/app/build/index.html'))
// console.log(`path.resolve('/app', 'build', 'index.html'))`, path.resolve('/app', 'build', 'index.html'))
console.log(path.join(process.cwd(), '/client/build'))






const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`))