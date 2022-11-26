const {userDb} = require('../dataBases')
const {ApiError} = require('../errors')
const {authService} = require("../servicec");

module.exports = {

    getAllUsers: async (req, res, next) => {
        try{
            const users = await userDb.find()

            res.json(users)
        }catch (e) {
            next(e)
        }
    },

    getById: async (req, res, next) => {
        try{
            res.json(req.user)
        }catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const newUser = req.body
            const hashPassword = await authService.hashPassword(newUser.password)

            const user = await userDb.create({...newUser, password: hashPassword})

            res.json(user)
        }catch (e) {
            next(e)
        }
    },

    updateUser: async (req, res, next) => {
        try{

            const newUserInfo = req.body
            const {userId} = req.params

            const updatedUser = await userDb.findByIdAndUpdate(userId, newUserInfo, {new:true})

            res.json(updatedUser)
        }catch (e) {
            next(e)
        }
    },

    deleteById: async (req, res, next) => {
        try{
            const {userId} = req.params

            await userDb.findByIdAndDelete(userId)

            res.json('Deleted')
        }catch (e) {
            next(e)
        }
    },

}
