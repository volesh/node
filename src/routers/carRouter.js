const router = require('express').Router()
const {carMiddleware} = require('../middlewares')
const {carController} = require("../controllers");

router.post('/:userId', carMiddleware.isCarValid, carController.createCar)

module.exports = router
