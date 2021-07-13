const router = require('express').Router();

const { constant } = require('../constant');
const { userController } = require('../controller');
const {
    accessMiddleware, authMiddleware, userMiddleware, uploadMiddleware, validatorMiddleware
} = require('../middleware');

router.get('/', userController.getUsers);
router.post('/',
    authMiddleware.checkAccessToken,
    accessMiddleware.checkRole([constant.ROLE_ENUM.ADMIN]),
    userMiddleware.checkIsEmailExists,
    uploadMiddleware.checkFile,
    uploadMiddleware.checkAvatar,
    userMiddleware.checkIsUserValid,
    userController.createUser);
router.post('/activate', authMiddleware.checkActivateToken, userController.activateUser);
router.post('/password/forgot',
    validatorMiddleware.emailValidate,
    userMiddleware.checkIsUserExists,
    userController.forgotPassword);
router.patch('/password/forgot',
    authMiddleware.checkResetPasswordToken,
    validatorMiddleware.passwordValidate,
    userController.resetForgotPassword);
router.post('/password/reset',
    authMiddleware.checkAccessToken,
    validatorMiddleware.resetPasswordValidate,
    userController.resetPassword);
router.get('/:id', userMiddleware.checkIsIdValid, userController.getUser);
router.delete('/:id',
    userMiddleware.checkIsIdValid,
    authMiddleware.checkAccessToken,
    accessMiddleware.checkRole([constant.ROLE_ENUM.ADMIN]),
    userController.deleteUser);
router.put('/:id',
    userMiddleware.checkIsIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.checkIsUpdateUserValid,
    userController.updateUser);
router.patch('/:id',
    userMiddleware.checkIsIdValid,
    authMiddleware.checkAccessToken,
    uploadMiddleware.checkChangeAvatar,
    userController.changeAvatar);

module.exports = router;
