const jwt = require('jsonwebtoken');

const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const {
    JWT_ACTIVATE_SECRET, JWT_RESET_PASSWORD_SECRET, JWT_REFRESH_SECRET, JWT_SECRET
} = require('../config/config');

const jwtVerify = async (action, token) => {
    let isValid;

    switch (action) {
        case 'activate':
            isValid = await jwt.verify(token, JWT_ACTIVATE_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_ACTIVATE_TOKEN);
                }
            });
            break;

        case 'access':
            isValid = await jwt.verify(token, JWT_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_TOKEN);
                }
            });
            break;

        case 'refresh':
            isValid = await jwt.verify(token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_REFRESH_TOKEN);
                }
            });
            break;

        case 'reset_password':
            isValid = await jwt.verify(token, JWT_RESET_PASSWORD_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_RESET_PASSWORD_TOKEN);
                }
            });
            break;

        // case 'forgot password':
        //     isValid = jwt.verify(token, JWT_FORGOT_PASSWORD_SECRET, (err) => {
        //         if (err) {
        //             throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorCustomCodes.NOT_VALID_RESET_PASSWORD_TOKEN);
        //         }
        //     });
        //     break;

        default:
            throw new ErrorHandler(errorCodesEnum.SERVER_ERROR, errorCustomCodes.WRONG_ACTION);
    }
    return isValid;
};
module.exports = { jwtVerify };
