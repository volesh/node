const {userService, emailService} = require("../services");
const {hashPassword} = require("../services/authService");
const {emailActionsConfig} = require("../configs");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await userService.getAll()

            res.json(users)
        }catch (e) {
            next(e)
        }
    },

    getById: async (req, res, next) => {
        try{
            const user = req.user

            res.json(user)
        }catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try{
            const userInfo = req.body
            const hashedPassword = await hashPassword(userInfo.password)
            const user = await userService.createUser({...userInfo, password:hashedPassword})

            res.json(user)
        }catch (e) {
            next(e)
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params
            const userInfo = req.body

            const newUser = await userService.updateUser(userId, userInfo)

            await emailService.sendEmail('volesh2@gmail.com', emailActionsConfig.USER_CHANGED)

            res.json(newUser)
        }catch (e) {
            next(e)
        }
    },

    deleteById: async (req, res, next) => {
        try{
            const {userId} = req.params

            await userService.deleteUser(userId)

            await emailService.sendEmail('volesh2@gmail.com', emailActionsConfig.USER_DELETED)

            res.json('Deleted')
        }catch (e) {
            next(e)
        }
    }
}
