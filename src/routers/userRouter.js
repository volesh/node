const router = require('express').Router()

const {userController} = require('../controllers')
const {userMiddlewares} = require('../middlewares')

router.get('/', userController.getAllUsers)
router.post('/', userMiddlewares.isNewUserValid, userController.createUser)

router.get(
    '/:userId',
    userMiddlewares.isUserIdValid,
    userMiddlewares.isUserExist,
    userController.getById
);
router.put(
    '/:userId',
    userMiddlewares.isUserIdValid,
    userMiddlewares.isUpdatedUserValid,
    userMiddlewares.isUserExist,
    userController.updateUser
);
router.delete(
    '/userId',
    userMiddlewares.isUserIdValid,
    userMiddlewares.isUserExist,
    userController.deleteById
);

module.exports = router;
