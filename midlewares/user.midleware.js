const userDb = require('../dataBase/User')
const ApiError = require('../errors/ApiError')

module.exports = {

    isUserValid:(req, res, next)=>{
        try {
            const newUser = req.body
            if (Object.keys(newUser).length !== 2 || newUser.name.length < 2 || typeof newUser.age !== 'number'){
                throw new ApiError('Invalid request', 400)
            }
            next()
        }catch (e) {
            next(e)
        }
    },

    isUserExisted: async (req, res, next) => {
        const {userId} = req.params
        try {
            const user = userDb.findById(userId)
            if (!user){
                throw new ApiError(`User with id:${userId} is not found`, 404)
            }

            next()
        }catch (e) {
            next(e)
        }
    }
}
