const {carValidator} = require("../validators");
const {ApiError} = require('../errors')

module.exports = {
    isCarValid:(req, res, next)=>{
        try{
            const newCar = req.body
            const validate = carValidator.newCarValidation.validate(newCar)

            if(validate.error){
                throw new ApiError(validate.error.message, 404)
            }

            next()
        }catch (e) {
            next(e)
        }
    }
}
