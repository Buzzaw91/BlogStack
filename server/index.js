const express = require('express')
const dotenv = require('dotenv').config()
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postRoutes.js')



const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`));