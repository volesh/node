const {carDb} = require('../dataBases')

module.exports = {
    createCar:async (req,res,next)=>{
        try {
            const car = await carDb.create({...req.body, _user_id: req.params.userId})

            res.json(car)
        }catch (e) {
            next(e)
        }
    }
}
