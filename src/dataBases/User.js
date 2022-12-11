const {Schema, model} = require('mongoose')
const {regexConfig} = require("../configs");

const userSchema = new Schema({
    name: {type:String, minLength:2, maxLength:50, require:true},
    age: {type:Number, min:16, max: 120, require:true},
    email: {type:String, regex: regexConfig.EMAIL, require: true, unique: true},
    password: {type:String, require: true}
},
    {timestamps: true})

module.exports = model('User', userSchema)
