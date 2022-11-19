const router = require('express').Router()
const controller = require('../controllers/user.controller')
const middleware = require('../midlewares/user.midleware')

router.get('/', controller.getAllUsers);

router.get('/:userId', middleware.isUserExisted,  controller.getUserById);

router.post('/', middleware.isUserValid, controller.createNewUser)

module.exports = router;
