const express = require('express')
const fileService = require('./services/fileService')
const fs = require('fs/promises')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mainePath = path.join(__dirname, 'usersDb.json')

app.get('/users', async (req, res)=>{
    const data = await fileService.findData(mainePath)

    res.json(data)
})

app.post('/users', async (req, res)=>{
    const data = await fileService.findData(mainePath)
    const newUser = {...req.body, id: data[data.length - 1].id + 1}

    data.push(newUser)

    await fs.writeFile(mainePath, JSON.stringify(data))

    res.json(newUser)

})

app.get('/users/:userId', async (req, res)=>{
    const data = await fileService.findData(mainePath)
    const { userId } = req.params

    const user = data.find(u => u.id === +userId)

    if (user){
        res.json(user)
    }else {
        res.status(404).json('User not found')
    }
})

app.put('/users/:userId', async (req, res)=>{
    const data = await fileService.findData(mainePath)
    const { userId } = req.params
    const newData = req.body

    const index = data.findIndex(u => u.id === +userId)

    data[index] = {...data[index], ...newData}

    res.status(202).json('Changed')
})

app.listen(5000)
