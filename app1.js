const express = require('express')
const fs = require('node:fs/promises')

const { json } = require("express");

const app1 = express()

app1.use(express.json())
app1.use(express.urlencoded({extended: true}))



app1.listen(3001, ()=>{
    console.log('Hello');
})
