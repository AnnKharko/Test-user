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
// router.post('/password/reset',
//     authMiddleware.checkResetPasswordToken,
//     validatorMiddleware.passwordValidate,
//     realtorController.resetPassword);
router.patch('/password/forgot',
    authMiddleware.checkResetPasswordToken,
    validatorMiddleware.passwordValidate,
    userController.resetForgotPassword);
router.post('/password/reset',
    authMiddleware.checkAccessToken,
    validatorMiddleware.resetPasswordValidate,
    userController.resetPassword);
// router.use('/:id', realtorMiddleware.checkIsIdValid); // сприймає усі інші endpoint як id !!!
router.get('/:id', userMiddleware.checkIsIdValid, userController.getUser);
router.delete('/:id', authMiddleware.checkAccessToken, userController.deleteUser);

module.exports = router;
