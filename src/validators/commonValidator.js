const Joi = require('joi')
const {regex} = require('../configs')

module.exports = {
    userIdValidator: Joi.string().regex(regex.mongoId)
}
