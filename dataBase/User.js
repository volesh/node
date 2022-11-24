const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name:{type:String, require:true, default:'', unique:true},
    age:{type:Number, default: 18}
},{
    timestamps:true
})

module.exports = model('User', userSchema)
