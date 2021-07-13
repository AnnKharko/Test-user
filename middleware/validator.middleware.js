const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { someFieldValidator } = require('../validator');
const { passwordHasher } = require('../helper');

module.exports = {
    passwordValidate: async (req, res, next) => {
        try {
            const { error } = await someFieldValidator.passwordValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    emailValidate: async (req, res, next) => {
        try {
            const { error } = await someFieldValidator.emailValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    loginValidate: async (req, res, next) => {
        try {
            const { error } = await someFieldValidator.loginValidator.validate(req.body);

            if (error) {
                // throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.BAD_REQUEST, error.details[0].message);
                return next(new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.BAD_REQUEST, error.details[0].message));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    resetPasswordValidate: async (req, res, next) => {
        try {
            const { password } = req.body;
            const user = req.userId;

            await passwordHasher.compare(password, user.password);

            const { error } = await someFieldValidator.resetPasswordValidator.validate(req.body);

            if (error) {
                return next(new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.BAD_REQUEST, error.details[0].message));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
