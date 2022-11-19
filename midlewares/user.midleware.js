const userDb = require('../dataBase/users.db')
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
        try {
            const {userId} = req.params
            const user = userDb.find(user => user.id === +userId)

            if (userId < 1 || isNaN(+userId)){
                throw new ApiError(`Invalid user id '${userId}' must be a number > 0`, 400)
            }

            if (!user){
                throw new ApiError(`User with id:${userId} is not found`, 404)
            }

            req.user = user

            next()
        }catch (e) {
            next(e)
        }

        next()
    }
}
