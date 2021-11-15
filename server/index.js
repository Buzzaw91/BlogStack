const express = require('express')
const dotenv = require('dotenv').config()



const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`));