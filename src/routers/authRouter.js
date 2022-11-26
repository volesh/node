const {authController} = require("../controllers");
const router = require('express').Router()
const {authMiddleware, userMiddlewares} = require('../middlewares')

router.post(
    '/login',
    authMiddleware.isLoginValid,
    userMiddlewares.isUserExistDynamically('email'),
    authController.login
)

module.exports = router
