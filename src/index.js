const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const {connectDB}= require('./config/db')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes');

require("dotenv").config();
const app = express();

connectDB();

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/api/v1/users/',userRoutes)
app.use('/api/v1/orders/',orderRoutes)

module.exports = app;