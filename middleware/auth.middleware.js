const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { constant } = require('../constant');
const { O_Auth } = require('../dataBase/models');
const { jwtVerifyHelper } = require('../helper');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constant.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.TOKEN_IS_REQUIRED);
            }

            await jwtVerifyHelper.jwtVerify('access', access_token);

            const tokens = await O_Auth.findOne({ access_token }).populate('user');

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_TOKEN);
            }

            req.infoTokens = tokens._id;
            req.userId = tokens.user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constant.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.REFRESH_TOKEN_IS_REQUIRED);
            }

            await jwtVerifyHelper.jwtVerify('refresh', refresh_token);

            const tokens = await O_Auth.findOne({ refresh_token });

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_REFRESH_TOKEN);
            }

            req.tokenInfo = tokens;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkActivateToken: async (req, res, next) => {
        try {
            const activate_token = req.get(constant.AUTHORIZATION);

            if (!activate_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.ACTIVATE_TOKEN_IS_REQUIRED);
            }

            // jwt.verify(activate_token, JWT_ACTIVATE_SECRET, (err) => {
            //     if (err) {
            //         throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_ACTIVATE_TOKEN);
            //     }
            // });
            await jwtVerifyHelper.jwtVerify('activate', activate_token);

            const user = await O_Auth.findOne({ activate_token }).populate('user');

            if (!user) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_ACTIVATE_TOKEN);
            }
            req.activeInfo = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkResetPasswordToken: async (req, res, next) => {
        try {
            const reset_password_token = req.get(constant.AUTHORIZATION);

            if (!reset_password_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.RESET_PASSWORD_TOKEN_IS_REQUIRED);
            }

            await jwtVerifyHelper.jwtVerify('reset_password', reset_password_token);

            const user = await O_Auth.findOne({ reset_password_token }).populate('user');

            if (!user) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_RESET_PASSWORD_TOKEN);
            }
            req.resPasswordInfo = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
