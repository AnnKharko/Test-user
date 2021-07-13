const { ErrorHandler, errorCodesEnum, errorCustomCodes } = require('../error');
const { passwordHasher, tokenizer } = require('../helper');
const { O_Auth, User } = require('../dataBase/models');

module.exports = {
    authUser: async (email, password) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new ErrorHandler(errorCodesEnum.NOT_FOUND, errorCustomCodes.USER_NOT_FOUND);
        }

        await passwordHasher.compare(password, user.password);

        const { access_token, refresh_token } = tokenizer('authorization');
        await O_Auth.create({ access_token, refresh_token, user: user._id });

        return {
            access_token,
            refresh_token
        };
    },
    refreshToken: async (user, _id) => {
        const { access_token, refresh_token } = tokenizer('authorization');
        await O_Auth.findByIdAndUpdate(_id, { access_token, refresh_token, user });

        return {
            access_token,
            refresh_token
        };
    },
    removeTokens: (id) => O_Auth.findByIdAndDelete(id),
    getTokensByParams: (findObject) => O_Auth.find(findObject)
};
