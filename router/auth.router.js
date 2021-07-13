const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware, userMiddleware, validatorMiddleware } = require('../middleware');

router.post('/',
    validatorMiddleware.loginValidate,
    userMiddleware.checkIsUserExists,
    userMiddleware.chekIsUserConfirmed,
    authController.authUser);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);
router.post('/logout', authMiddleware.checkAccessToken, authController.logoutUser);

module.exports = router;
