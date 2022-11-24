const userDb = require('../dataBase/User')

module.exports = {
    getAllUsers: async (req, res, next)=>{
        try {
            const users = await userDb.find()

            res.json(users)
        }catch (e) {
            next(e)
        }
    },
    getUserById: async (req, res, next)=>{
        const {userId} = req.params
        try {
            const user = await userDb.findById(userId)
            res.json(user)
        }catch (e) {
            next(e)
        }
    },

    createNewUser: async (req, res, next) => {
        try{
            const newUser = req.body
            await userDb.create(newUser)
            res.json('created')
        }catch (e) {
            next(e)
        }
    },

    updateUser: async (req, res, next) => {
        const newUserInfo = req.body
        const {userId} = req.params
        try{
            await userDb.findByIdAndUpdate(userId, newUserInfo)
            res.json('updated')
        }catch (e) {
            next(e)
        }
    },

    deleteUserById: async (req, res, next) => {
        const {userId} = req.params
        try {
            await userDb.findByIdAndDelete(userId)
            res.json('Deleted')
        }catch (e) {
            next(e)
        }
    }
}
