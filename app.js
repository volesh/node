const express = require('express')
const fs = require('node:fs')

const db = require('./usersDb.json')
const {json} = require("express");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userValidator = (user) => {
    if (user.name && user.age){
        return true
    }else{
        return false
    }
}

app.get('/users', (req, res)=>{
    res.json(db)
})

app.get('/users/:userId', (req, res)=>{
    const id = req.params.userId

    fs.readFile('./usersDb.json', (err, data)=>{
        let arr = JSON.parse(data)
        if (arr[id]){
            res.json(arr[id])
        }else{
            res.status(400).json('User not found')
        }
    })
})

app.post('/users', (req, res)=>{
    const newUser = req.body

    if (userValidator(newUser)){
        fs.readFile('./usersDb.json', (err, data)=> {
            let arr = JSON.parse(data)
            arr.push(newUser)
            fs.writeFile('./usersDb.json', JSON.stringify(arr), (err)=>{
                // res.json('Something went wrong')
            })
            res.json('did')
        })
    }else{
        res.json("Invalid request")
    }

})

app.put('/users/:userId', (req, res)=>{
    const newUser = req.body
    const userId = req.params.userId


    fs.readFile('./usersDb.json', (err, data)=> {
        let arr = JSON.parse(data)
        if (arr[userId] && userValidator(newUser)){
            arr[userId] = newUser

            fs.writeFile('./usersDb.json', JSON.stringify(arr), (err)=>{
                res.status(500).json('Something went wrong')
            })

            res.json('Did')
        }else {
            res.status(404).json('Invalid request')
        }
    })

})

app.delete('/users/:userId', (req, res)=>{
    const userId = req.params.userId

    fs.readFile('./usersDb.json', (err, data)=>{
        let arr = JSON.parse(data);
        if (arr[userId]){
            arr.splice(userId, 1)
            fs.writeFile('./usersDb.json', JSON.stringify(arr), (err)=>{})
            res.json('Did')
        }else {
            res.json('Problem')
        }
    })

})


app.listen(3001, ()=>{
    console.log('Hello');
})
