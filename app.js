const express = require('express');
const userRouter = require('./routers/user.router');
const mongoose = require('mongoose')

require('dotenv').config();
const config = require('./configs/envs.config');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRouter)

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Unknown error',
        statusCode: err.statusCode || 500
    })
})

app.listen(config.PORT, async ()=>{
    await mongoose.connect(config.MONGO_SERVER)
})
