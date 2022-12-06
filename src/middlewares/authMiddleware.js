const {authValidator} = require("../validators");
const {ApiError} = require('../errors')
const {authService} = require("../servicec");
const {authDb} = require('../dataBases')


module.exports = {
    isLoginValid: async (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body)

            if (validate.error) {
                throw new ApiError(validate.error.message, 400)
            }

            next()
        }catch (e) {
            next(e)
        }
    },

    isAccessTokenValid: async (req, res, next) => {
        try {
            const accessToken = req.get('AUTHORIZATION')

            console.log(accessToken);
            if (!accessToken){
                throw new ApiError('No token', 401)
            }

            authService.checkToken(accessToken)

            const tokenInfo = authDb.findOne({ accessToken })

            if(!tokenInfo){
                throw new ApiError('Token not valid', 401)
            }

            next()
        }catch (e) {
            next(e)
        }
    },

    isRefreshValid: (req, res, next) => {
        try {
            const refreshToken = req.get('AUTHORIZATION')

            if (!refreshToken){
                throw new ApiError('No token', 401)
            }

            authService.checkToken(refreshToken, 'refreshToken')

            const tokenInfo = authDb.findOne({ refreshToken })

            if(!tokenInfo){
                throw new ApiError('Token not valid', 401)
            }

            req.tokenInfo = tokenInfo
            next()
        }catch (e) {
            next(e)
        }
    }
}
