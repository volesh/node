const {userDb} = require('../dataBases')
const {ApiError} = require('../errors')
const {authService} = require("../servicec");
const {sendEmail} = require("../servicec/emailService");
const {emailConfig} = require('../configs')
const {userService} = require('../servicec')

module.exports = {

    getAllUsers: async (req, res, next) => {
        try{
            const users = await userService.getAll()

            res.json(users)
        }catch (e) {
            next(e)
        }
    },

    getById: async (req, res, next) => {
        try{
            await sendEmail('', emailConfig.LALA)
            res.json(req.user[0])
        }catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const newUser = req.body.user
            const hashPassword = await authService.hashPassword(newUser.password)

            const user = await userService.createUser(newUser, hashPassword)

            res.json(user)
        }catch (e) {
            next(e)
        }
    },

    updateUser: async (req, res, next) => {
        try{

            const newUserInfo = req.body
            const {userId} = req.params

            const updatedUser = await userService.updateUser(userId, newUserInfo)

            res.json(updatedUser)
        }catch (e) {
            next(e)
        }
    },

    deleteById: async (req, res, next) => {
        try{
            const {userId} = req.params

            await userService.deleteById(userId)

            res.json('Deleted')
        }catch (e) {
            next(e)
        }
    },

}
