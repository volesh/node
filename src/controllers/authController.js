const {authService} = require("../servicec");
const {authDb} = require('../dataBases')
const {sendEmail} = require("../servicec/emailService");
const {emailConfig} = require('../configs')

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req

            await sendEmail('', emailConfig.LOGIN)

            await authService.comparePasswords(body.password, user.password)

            const tokenPair = authService.generateAccessTokenPair({id: user._id})

            await authDb.create({...tokenPair, _user_id: user._id})

            res.status(200).json(tokenPair)
        }catch (e) {
            next(e)
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {_user_id, refreshToken} = req.tokenInfo

            authDb.findOneAndDelete({refreshToken})

            const tokenPair = authService.generateAccessTokenPair({id: _user_id})

            await authDb.create({...tokenPair, _user_id})

            res.status(200).json(tokenPair)
        }catch (e) {
            next(e)
        }
    },
}
