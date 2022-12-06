const Joi = require("joi");
const {regex} = require("../configs");


module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().regex(regex.email).required().trim().lowercase(),
        password: Joi.string().regex(regex.password).required()
    })
}
