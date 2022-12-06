const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {ApiError} = require("../errors");
const {envsConfig} = require('../configs')

module.exports = {
    hashPassword: (pass) => bcrypt.hash(pass, 10),

    comparePasswords: async (pass, hashedPass) => {
        const isPasswordsSame = await bcrypt.compare(pass, hashedPass)

        if (!isPasswordsSame) {
            throw new ApiError('Wrong password', 400)
        }
    },

    generateAccessTokenPair: (data = {}) => {
        const accessToken = jwt.sign(data, envsConfig.ACCESS_KEY_WORD, {expiresIn: '10m'})
        const refreshToken = jwt.sign(data, envsConfig.REFRESH_KEY_WORD, {expiresIn: '30d'})

        return{
            accessToken,
            refreshToken
        }
    },

    checkToken: (token = '', tokenType = 'accessToken') => {
        let secretWord = '';
        if (tokenType === 'accessToken') secretWord = envsConfig.ACCESS_KEY_WORD;
        else if (tokenType === 'refreshToken') secretWord = envsConfig.REFRESH_KEY_WORD;

        return jwt.verify(token, secretWord);
    }
}
