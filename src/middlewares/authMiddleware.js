const {authValidator} = require("../validators");
const {ApiError} = require('../errors')


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
    }
}
