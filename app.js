const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const {envsConfig} = require('./src/configs')
const routers = require('./src/routers')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', routers.userRouter)
app.use('/auth', routers.authRouter)
app.use('/cars', routers.carRouter)

app.use((err, req, res, next)=>{
    res.status(err.statusCode || 500)
            .json({
                message:err.message || 'Unknown error',
                statusCode: err.statusCode || 500
            })
})

app.listen(envsConfig.PORT, async ()=>{
    await mongoose.connect(envsConfig.MONGO_SERVER)
})
