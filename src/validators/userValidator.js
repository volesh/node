const Joi = require('joi')
const {regex} = require('../configs')

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        age: Joi.number().min(16).max(120).required(),
        email: Joi.string().regex(regex.email).lowercase().trim().required(),
        password: Joi.string().regex(regex.password).required()
    }),

    updateUserValidator: Joi.object({
        name: Joi.string().min(2).max(50).optional(),
        age: Joi.number().min(16).max(120).optional(),
        email: Joi.string().regex(regex.email).lowercase().trim().optional()
    })
}
