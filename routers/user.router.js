const router = require('express').Router()
const controller = require('../controllers/user.controller')
const middleware = require('../midlewares/user.midleware')

router.get('/', controller.getAllUsers);

router.get('/:userId', middleware.isUserExisted,  controller.getUserById);

router.post('/', middleware.isUserValid, controller.createNewUser);

router.put('/:userId', middleware.isUserExisted, controller.updateUser)

module.exports = router;
