const {userDb} = require('../dataBases')
module.exports = {
    getAll: () => userDb.find(),

    getUserById: async (userId) => {
        const user = await userDb.findById(userId)
        return user
    },

    createUser: async (newUser, password)=> {
       return await userDb.create({...newUser, password})
    },

    updateUser: async (userId, newUserInfo) => {
        console.log(newUserInfo);
        const user = await userDb.findOneAndUpdate({_id:userId}, newUserInfo, {new:true})
        return user
    },

    deleteById: async (userId) => {
        await userDb.findByIdAndDelete(userId)
    }
}
