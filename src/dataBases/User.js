const {Schema, model} = require('mongoose')
const {defaults} = require("joi");

const userSchema = new Schema({
    name:{type:String, minLength:2, maxLength:50},
    age:{type:Number, min:16, max:120},
    email:{type:String, require:true, lowercase:true, unique:true},
    password:{type:String, require: true}
},
    {timestamps:true})

module.exports = model('User', userSchema)
