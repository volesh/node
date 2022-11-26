const {userValidator, commonValidator} = require("../validators");
const {ApiError} = require('../errors')
const {userDb} = require("../dataBases");


module.exports = {
    isUserExistDynamically: (fieldName, findIn = 'body', dbField = fieldName) => async (req, res, next) => {
        try{
            const fieldToSearch = req[findIn][fieldName]

            const user = await userDb.findOne({[dbField]: fieldToSearch})
            if (!user) {
                throw new ApiError('User not found', 404)
            }

            req.user = user
            next()
        }catch (e) {
            next(e)
        }
    },

    isUserExist: async (req, res, next) => {
        try {

            const user = await userDb.findById(req.params.userId)

            if(!user){
                throw new ApiError('User not Found', 404)
            }

            req.user = user

            next()
        }catch (e) {
            next(e)
        }
    },

    isNewUserValid: (req, res, next) => {
        try{
            const validate = userValidator.newUserValidator.validate(req.body)

            if (validate.error){
                throw new ApiError(validate.error.message, 500)
            }

            req.body = validate.value

            next()
        }catch (e) {
            next(e)
        }
    },

    isUpdatedUserValid: (req, res, next) => {
        try{
            const validate = userValidator.updateUserValidator.validate(req.body)

            if (validate.error){
                throw new ApiError(validate.error.message, 500)
            }

            next()
        }catch (e) {
            next(e)
        }
    },

    isUserIdValid: (req, res, next) => {
        try{

            const validate = commonValidator.userIdValidator.validate(req.params.userId)

            if (validate.error){
                throw new ApiError(validate.error.message, 400)
            }

            next()
        }catch (e) {
            next(e)
        }
    }

}
