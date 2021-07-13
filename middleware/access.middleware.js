const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { User } = require('../dataBase/models');

module.exports = {
    checkRole: (whoHaveAccess = []) => async (req, res, next) => {
        try {
            const { userId } = req;
            const user = await User.findById(userId);

            if (!whoHaveAccess.length) {
                return next();
            }

            if (!whoHaveAccess.includes(user.role)) {
                throw new ErrorHandler(errorCodesEnum.FORBIDDEN, errorCustomCodes.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
