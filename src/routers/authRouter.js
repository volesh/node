const {authController} = require("../controllers");
const router = require('express').Router()
const {authMiddleware, userMiddlewares} = require('../middlewares')

router.post(
    '/login',
    authMiddleware.isLoginValid,
    userMiddlewares.isUserExistDynamically('email'),
    authController.login
)

router.post(
    '/refresh',
    authMiddleware.isRefreshValid,
    authController.refresh
    )
module.exports = router
