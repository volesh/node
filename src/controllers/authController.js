const {authService} = require("../servicec");
const {authDb} = require('../dataBases')

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req

            await authService.comparePasswords(body.password, user.password)

            const tokenPair = authService.generateAccessTokenPair({id: user._id})

            await authDb.create({...tokenPair, _user_id: user._id})

            res.status(200).json(tokenPair)
        }catch (e) {
            next(e)
        }
    }
}
