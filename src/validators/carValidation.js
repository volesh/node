const Joi = require('joi')

module.exports = {
    newCarValidation:Joi.object({
        model: Joi.string().required(),
        price: Joi.number().min(1).max(1000000).required(),
        year:Joi.string().required()
    }),

    updateCarValidation: Joi.object({
        model: Joi.string().optional(),
        price: Joi.number().min(1).max(1000000).optional(),
        year:Joi.string().optional()
    })
}
