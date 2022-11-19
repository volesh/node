const express = require('express');
const userRouter = require('./routers/user.router');

require('dotenv').config();
const config = require('./configs/envs.config');

const app = express()

app.use('/users', userRouter)

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || 'Unknown error',
        statusCode: err.statusCode || 500
    })
})

app.listen(config.PORT, ()=>{
    console.log('WELCOME');
})
