const express = require('express')
const fs = require('node:fs')

const db = require('./usersDb.json')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', (req, res)=>{

    res.json(db)
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
