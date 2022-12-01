const {Schema, model} = require('mongoose')

const carsSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, ref:'User'},
    model:{type: String, require:true},
    year:{type:String, require: true},
    price:{type:Number, min:1, max:1000000, require:true}
})

module.exports = model('Car', carsSchema)
