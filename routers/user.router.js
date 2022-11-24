const router = require('express').Router()

const controller = require('../controllers/user.controller')
const {isUserExisted, isUserValid} = require("../midlewares/user.midleware");

router.get('/', controller.getAllUsers);
router.post('/', isUserValid, controller.createNewUser);

router.get('/:userId', isUserExisted,  controller.getUserById);
router.put('/:userId', isUserValid, isUserExisted, controller.updateUser)
router.delete('/:userId', isUserExisted, controller.deleteUserById)

module.exports = router;
