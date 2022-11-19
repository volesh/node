const userDb = require('../dataBase/users.db')

module.exports = {
    getAllUsers: (req, res, next)=>{
        res.json(userDb)
    },
    getUserById: (req, res, next)=>{
        res.json(req.user)
    },
    createNewUser: (req, res, next) => {
        const user = req.body
        const newId = userDb[userDb.length - 1].id + 1
        userDb.push({...user, id:newId})
        res.json({...user, id:newId})
    }
}
