const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { User } = require('../dataBase/models');
const { userValidator } = require('../validator');
const { userService } = require('../service');
const { STATUS_ENUM } = require('../constant/constant');

module.exports = {
    checkIsUserValid: async (req, res, next) => {
        try {
            const { error } = await userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsIdValid: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findById({ _id: id });

            if (!user) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorCustomCodes.NOT_EXIST_USER_WITH_SUCH_ID);
            }

            req.userInfo = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsEmailExists: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await userService.findOneByParams({ email });

            if (user) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.USER_ALREADY_REGISTERED);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsUserExists: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await userService.findOneByParams({ email });

            if (!user) {
                return next(new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.USER_NOT_FOUND));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    chekIsUserConfirmed: (req, res, next) => {
        try {
            const { status } = req.user;

            if (status !== STATUS_ENUM.CONFIRMED) {
                return next(new ErrorHandler(errorCodesEnum.FORBIDDEN, errorCustomCodes.FORBIDDEN_USER_NOT_CONFIRMED));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
